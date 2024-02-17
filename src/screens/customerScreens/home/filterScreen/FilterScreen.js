import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { AppButton, FilterData, FilterForm, BackButton } from "../../../../components";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import closeIcon from "../../../../assets/images/closeIcon.png";
import { CategoryName, globalStyles, HomeName, HomeScreenName } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

export const FilterScreen = ({ navigation }) => {
  let dispatch = useDispatch();
  const filterStore = useSelector((st) => st.filter);
  const user = useSelector((st)=>st.customer)
  const [sort, setSort] = useState([
    {
      id: 1,
      name: "В наличии",
      check: false,
      key: "stock",
    },
    {
      id: 2,
      name: "По дате публикации убыв",
      check: false,
      key: "newFirst",
    },
    {
      id: 3,
      name: "По дате публикации возр",
      check: false,
      key: "oldFirst",
    },
    {
      id: 4,
      name: "По убыванию цены",
      check: false,
      key: "priceDesc",
    },
    {
      id: 5,
      name: "По возрастанию цены",
      check: false,
      key: "priceAsc",
    },
    {
      id: 6,
      name: "По Кол-ву меньш",
      check: false,
      ley: "countAsc",
    },
    {
      id: 7,
      name: "По кол.ву больш",
      check: false,
      key: "countDesc",
    },
  ]);
  let [subCategory, setSubCategory] = useState([]);
  let [category, setCategory] = useState({});
  useEffect(() => {
    if (Object.keys(filterStore).length) {
      for (let i = 0; i < sort.length; i++) {
        if (sort[i].key === filterStore.sort) {
          sort[i].check = true;
        }
      }
      setSort([...sort]);
      if (filterStore.category_id) {
        checkSubCategory({ _id: filterStore.category_id, title: filterStore.category_name }).then(r => {
          for (let i = 0; i < r.length; i++) {
            for (let j = 0; j < filterStore.sub_id.length; j++) {
              if (filterStore.sub_id[j] === r[i]._id) {
                r[i].check = true;
              }
            }
          }
          setSubCategory([...r]);
        });
      }
    }
  }, [filterStore]);

  let checkSubCategory = async (item) => {
    try {
      let response = await axiosInstance.get(`/sub-categories?seller_id=${user._id}`, {
        params: {
          category_id: item._id,
        },
      });
      let data = response.data.subcategories;
      for (let i = 0; i < data.length; i++) {
        data[i].check = false;
      }
      setCategory(item);
      setSubCategory(data);
      return data;
    } catch (e) {
      setCategory(item);
      console.log(e);
    }
  };

  let checkFilterSort = (index) => {
    for (let i = 0; i < sort.length; i++) {
      sort[i].check = false;
    }
    sort[index].check = true;
    setSort([...sort]);
  };
  let checkFilterSub = (index) => {
    subCategory[index].check = !subCategory[index].check;
    setSubCategory([...subCategory]);
  };

  let filter = () => {
    let subcategoryText = "";
    let sortText = "";
    let stock = false;
    let sub_id = [];
    subCategory.map((data, index) => {
      if (data.check) {
        if (index === 0) {
          subcategoryText = subcategoryText + data._id;
        } else {
          subcategoryText = subcategoryText + "," + data._id;
        }
        sub_id.push(data._id);
      }
    });
    sort.map(data => {
      if (data.check && data.key !== "stock") {
        sortText = data.key;
      } else {
        stock = true;
      }
    });
    let data = {
      category_id: category._id,
      category_name: category.title,
      subcategory: subcategoryText,
      sort: sortText,
      stock,
      sub_id,
    };
    dispatch({
      type: "SET_FILTER",
      payload: data,
    });
    navigation.navigate(HomeScreenName);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <BackButton
            navigation={navigation}
            text={"Фильтры"}
            deleteAll={() => {
              dispatch({
                type: "SET_FILTER_DELETE",
              });
              for (let i = 0; i < sort.length; i++) {
                sort[i].check = false;
              }
              setSort([...sort]);
              setCategory({});
              setSubCategory([]);
              navigation.navigate(HomeScreenName);
            }}
          />
        </View>
        <View style={styles.containerCategory}>
          <Text
            style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.titleCategory, globalStyles.weightBold, globalStyles.titleTextSmall]}>Сортировка</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} bounces={false}>
            {sort.map((item, index) => {
              return (
                <FilterForm
                  check={checkFilterSort}
                  item={item}
                  index={index}
                  key={index}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.containerCategory}>
          <Text
            style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.titleCategory, globalStyles.weightBold, globalStyles.titleTextSmall]}>Выберите
            категорию</Text>
          <TouchableOpacity onPress={() => navigation.navigate(CategoryName, { checkSubCategory: checkSubCategory })}>
            <View style={styles.category}>
              {category.title ?
                <Text
                  style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>{category.title}</Text>
                :
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Выберите
                  категорию</Text>
              }
              <TouchableOpacity>
                <Image source={closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerCategory}>
          <Text
            style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.titleCategory, globalStyles.weightBold, globalStyles.titleTextSmall]}>Подкатегория</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {subCategory.map((item, index) => {
              return (
                <FilterForm
                  check={checkFilterSub}
                  item={item}
                  index={index}
                  key={index}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View>
        <AppButton
          text={"Применить"}
          stylesContainer={styles.containerBtn}
          onPress={filter}
        />
      </View>
    </View>
  );
};

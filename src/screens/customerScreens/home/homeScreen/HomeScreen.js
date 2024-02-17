import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { BaseUrl, Colors, FilterName, globalStyles } from "../../../../constants";
import { Loading } from "../../../../components";
import { FormGoods, SwitchTogglesCustom, ArciveModal } from "../../../../components";
import { FlatList, Image, Platform, StatusBar, Text, TouchableOpacity, View } from "react-native";

import FilterIcon from "../../../../assets/images/filter.png";
import bottomIcon from "../../../../assets/images/bottomIcon.png";
import winIcon from "../../../../assets/images/winIcon.png";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../networking/axiosInstance";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const HomeScreen = ({ navigation }) => {
  const store = useSelector((st) => st.customer);
  const filter = useSelector((st) => st.filter);
  const shop = store.active_store;
  const [loading, setLoading] = useState(false);
  const [goodsData, setGoodsData] = useState([]);
  const [shopId, setSopId] = useState("");
  const [promotNum, setPromotNum] = useState(0);
  const [stateArcive, setStateArcive] = useState(false);
  const [textArcive,setTextArcive] = useState("Все")
  const arciveStateFunc = (st) => setStateArcive(st);
  console.log(store)
  useEffect(() => {
    if (Object.keys(filter).length) {
      getFilter();
    } else {
      getGoods();
    }
  }, [store, filter]);
  console.log(store)
  const onPressFuncArcive = async (st,st1) => {
    setTextArcive(st1)
    setLoading(true);
    arciveStateFunc(false);
    if (st === "все") {
      getGoods();
    } else {
      let url = `goods//?stock=${st ? '' : st}`;
      try {
        const response = await axiosInstance.get(`${url}&store_id=${store.active_store._id}`);
        setGoodsData([]);
        setGoodsData(response.data);
        numberAllGoodsFunc(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }

    }
  };

  const getGoods = async () => {
    try {
      const response = await axiosInstance.get(`/goods?store_id=${shop._id}`);
      console.log(response,'fff')
      setGoodsData([]);
      setGoodsData(response.data);
      setSopId(shop._id);
      numberAllGoodsFunc(response.data);
      setLoading(false)
    } catch (e) {
      console.log(e,'ddd');
    }
  };

  const proFunc = (n) => {
    setPromotNum(`${+promotNum + n}`);
  };

  const getFilter = async () => {
    try {
      let query = {};
      if (filter.stock) {
        query.sort = true;
      }
      let url = "goods//?";
      if (filter.category_id) {
        url = url + `category=${filter.category_id}&`;
      }
      if (filter.subcategory) {
        url = url + `subcategory=${filter.subcategory}&`;
      }
      if (filter.sort) {
        url = url + `sort=${filter.sort}`;
      }
      const response = await axiosInstance.get(`${url}&store_id=${store.active_store._id}`, {
        headers: {
          query: query,
        },
      });
      setGoodsData([]);
      setGoodsData(response.data);
      numberAllGoodsFunc(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const numberAllGoodsFunc = (data) => {
    let pro = 0;
    let allNum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_promoted) {
        pro = pro + 1;
      }
    }
    setPromotNum(pro);
  };

  return (
    <View style={[globalStyles.container,
      Platform.OS === 'ios' &&{marginTop: - (getStatusBarHeight(true) +8)}
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.blueBackground} />
      <View style={[styles.headerContainer,
        Platform.OS === 'ios' &&{paddingTop:  (getStatusBarHeight(true) +8)}
      ]}>
        <View style={styles.headerTextContainer}>
          <Text style={[globalStyles.titleText, globalStyles.titleTextBig]}>Мои товары</Text>
          <Text style={[globalStyles.titleText, globalStyles.titleTextSmall]}>{goodsData.length} шт</Text>
        </View>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.filterContainer} onPress={() => navigation.navigate(FilterName)}>
            <Text
              style={[styles.filterTextStyle, globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall]}>Фильтры</Text>
            <Image source={FilterIcon} style={styles.filterIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterContainerFill} onPress={() => arciveStateFunc(true)}>
            <Text
              style={[styles.filterTextStyle, globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall]}>{textArcive}</Text>
            <Image source={bottomIcon} style={styles.bottomIconStyle} />
          </TouchableOpacity>
          <View>
          </View>
        </View>
        <View style={styles.HeaderFooter}>
          <Image source={winIcon} style={styles.winIconStyle} />
          <Text style={[styles.headerFooterText, globalStyles.titleText, globalStyles.titleTextSmall,styles.prod]}>Товары с
            продвижением: {promotNum} шт</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formContent}>
          <FlatList
            data={goodsData}
            renderItem={({ item, index }) => {
              return (
                <FormGoods
                  item={item}
                  key={index}
                  navigation={navigation}
                  proFunc={proFunc}
                />
              );
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      </View>
      <Loading loading={loading} />
      <ArciveModal
        visible={stateArcive}
        modalFunc={arciveStateFunc}
        onPressFuncArcive={onPressFuncArcive}
      />
    </View>
  );
};

import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { View, Text, Image, FlatList } from "react-native";
import { BackButton, FormCategory, FormSubCategory } from "../../../../components";
import { BaseUrl, globalStyles } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import axios from "axios";

export const SubCategoryScreen = ({ navigation, route }) => {
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState({});
  const item = route.params.item;

  useEffect(() => {
    setCategory(route.params.item);
    getSubCategory();
  }, []);

  let getSubCategory = async () => {
    try {
      let response = await axiosInstance.get("/sub-categories", {
        params: {
          category_id: route.params.item._id,
        },
      });
      setSubCategory(response.data.subcategories);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton
        text={"Подкатегории"}
        navigation={navigation}
      />
      <View style={[styles.containerForm, { backgroundColor: "#FFE5B1" }]}>
        <View style={[globalStyles.row]}>
          <View>
            <Image source={{ uri: BaseUrl + "/" + category.photo_url }} style={styles.img} />
          </View>
          <View>
            <Text style={[globalStyles.titleText]}>{category.title}</Text>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall4, globalStyles.textAlignLeft]}>{category.productCount} товаров</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={subCategory}
        renderItem={({ item, index }) => {
          return (
            <FormSubCategory
              item={item}
              key={index}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

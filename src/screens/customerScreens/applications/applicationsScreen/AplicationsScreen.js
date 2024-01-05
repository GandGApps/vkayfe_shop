import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Colors, globalStyles } from "../../../../constants";
import { ApplicationsData_, ApplicationsForm, FilterData, FilterForm, FormSubCategory } from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";


export const AplicationsScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [banner, setBanner] = useState("");
  const [active, setActive] = useState("Сегодня");
  const [sort, setSort] = useState([
    {
      id: 1,
      name: "Все",
      check: true,
      key: "all",
      amount: 0,
    },
    {
      id: 2,
      name: "Новые",
      check: false,
      key: "pending",
      amount: 0,
    },
    {
      id: 3,
      name: "Заказ принят",
      check: false,
      key: "approved",
      amount: 0,
    },
    {
      id: 4,
      name: "Заказ в сборке",
      check: false,
      key: "assembling",
      amount: 0,
    },
    {
      id: 5,
      name: "Ожидает подтверждения",
      check: false,
      key: "accepted",
      amount: 0,
    },
    {
      id: 6,
      name: "Заказ в пути",
      check: false,
      key: "in_transit",
      amount: 0,
    },
    {
      id: 7,
      name: "Заказ завершен",
      check: false,
      key: "completed",
      amount: 0,
    },
    {
      id: 8,
      name: "Заказ отменен",
      check: false,
      key: "cancelled",
      amount: 0,
    },
  ]);
  let [sortActive, setSortActive] = useState({});


  useEffect(() =>{
    setSortActive({
      id: 10,
      name: "Все",
      check: false,
      key: "all",
      amount: orders.length,
    });
    checkFilterSort(0)

  },[active])

  const axiosFunc = async (arr) => {
    for (let i = 0; i < sort.length; i++) {
      sort[i].amount = 0;
    }
    try {
      arr.map((item, index) => {
        if (item.status_id.name === "approved") {
          item.status_id.title = "Заказ принят";
        } else if (item.status_id === "assembling") {
          item.status_id.title = "Заказ в сборке";
        } else if (item.status_id.name === "accepted") {
          item.status_id.title = "Ожидает подтверждения";
        } else if (item.status_id.name === "pending") {
          item.status_id.title = "Ожидает подтвержден";
        } else if (item.status_id.name === "in_transit") {
          item.status_id.title = "Заказ в пути";
        } else if (item.status_id.name === "completed") {
          item.status_id.title = "Заказ завершен";
        } else if (item.status_id.name === "cancelled") {
          item.status_id.title = "Заказ отменен";
        }
      });
      for (let i = 0; i < sort.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].status_id.title === sort[i].name) {
            sort[i].amount++;
          } else if (sort[i].name === "Все") {
            sort[i].amount = arr.length;
          }
        }
      }
      setOrders(arr);
      setOrdersData([...arr]);
      setSortActive({
        id: 10,
        name: "Все",
        check: false,
        key: "all",
        amount: arr.length,
      });
    } catch (e) {

    }
  };

 useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      changeStateFunc();
      getBanner();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!active) {
      changeStateFunc("Сегодня");

    }
  }, [active]);

  const getBanner = async () => {
    try {
      const response = await axiosInstance.get("/goods/banner");
      setBanner(response.data.banner);
    } catch (e) {
      console.log(e);
    }
  };

  let checkFilterSort = (index) => {
    let arr = [];
    for (let i = 0; i < sort.length; i++) {
      sort[i].check = false;
    }
    sort[index].check = true;
    setSort([...sort]);
    if (sort[index].key !== "all") {
      for (let i = 0; i < ordersData.length; i++) {
        if (ordersData[i].status_id.name === sort[index].key) {
          arr.push(ordersData[i]);
        }
      }
      setOrders([...arr]);
    } else {
      setOrders([...ordersData]);
    }
    setSortActive({ ...sort[index] });
  };


  const changeStateFunc = async (st) => {
    setActive(st);
    if (st === "Сегодня") {
      try {
        const response = await axiosInstance.get("/orders/seller");
        setSortActive({});
        setOrders([]);
        setOrdersData([]);
        const arr = response.data;
        const currentDate = new Date();
        let filterArr = []
        for(let i = 0; i< arr.length; i++){
          if(new Date(arr[i].delivery_date).toDateString() === currentDate.toDateString()){
            filterArr.push(arr[i])
          }
        }
        await axiosFunc([...filterArr]);
      } catch (e) {

      }
    } else if (st === "Завтра") {
      try {
        const response = await axiosInstance.get("/orders/seller");
        setSortActive({});
        setOrders([]);
        setOrdersData([]);
        const arr = response.data;
        const currentDate = new Date();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(currentDate.getDate() + 1);
        let filterArr = []
        for(let i = 0; i< arr.length; i++){
          if(new Date(arr[i].delivery_date).toDateString() === oneDayAgo.toDateString()){
            filterArr.push(arr[i])
          }
        }
        await axiosFunc([...filterArr]);
      } catch (e) {

      }
    } else if (st === "Все") {
      try {
        const response = await axiosInstance.get("/orders/seller");
        setSortActive({});
        setOrders([]);
        setOrdersData([]);
        const arr = response.data;
        await axiosFunc(arr);
      } catch (e) {
      }
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightBold, globalStyles.titleTextBig, styles.textZakaz]}>Заказы</Text>
          <View style={[globalStyles.row, styles.headerFooter]}>
            <TouchableOpacity
              style={active === "Сегодня" && styles.activeText}
              onPress={() => changeStateFunc("Сегодня")}>
              <Text style={[
                globalStyles.titleText,
                globalStyles.weightLight,
                globalStyles.titleTextSmall,
                styles.headerFooterText,
                active === "Сегодня" && styles.activeTextContent,
              ]}>Сегодня</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={active === "Завтра" && styles.activeText}
              onPress={() => changeStateFunc("Завтра")}>
              <Text style={[
                globalStyles.titleText,
                globalStyles.weightLight,
                globalStyles.titleTextSmall,
                styles.headerFooterText,
                active === "Завтра" && styles.activeTextContent,
              ]}>Завтра</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={active === "Все" && styles.activeText}
              onPress={() => changeStateFunc("Все")}>
              <Text style={[
                globalStyles.titleText,
                globalStyles.weightLight,
                globalStyles.titleTextSmall,
                styles.headerFooterText,
                active === "Все" && styles.activeTextContent,
              ]}>Все</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {sort.map((item, index) => {
            return (
              <FilterForm
                st
                item={item}
                index={index}
                key={index}
                check={checkFilterSort}
              />
            );
          })}
        </ScrollView>
      </View>
      {Object.keys(ApplicationsData_).length ?
        <FlatList
          data={orders}
          renderItem={({ item, index }) => {
            return (
              <ApplicationsForm
                item={item}
                key={index}
                navigation={navigation}
                orders={orders}
                banner={banner}
              />
            );
          }}
        /> :
        <View>
          <Text
            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, styles.noDataText]}>Нет
            активных заказов, нажмите на филтер “Все”</Text>
        </View>
      }
    </View>
  );
};

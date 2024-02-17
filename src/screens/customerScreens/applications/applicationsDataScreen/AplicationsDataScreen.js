import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { BaseUrl, Colors, globalStyles, MessagesName } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import postCardImg from "../../../../assets/images/postCard.png";

import {
  ApplicationsChangeForm,
  BackButton,
  HomeFormData,
} from "../../../../components";
import messageIcon from "../../../../assets/images/chatIcon.png";
import SelectDropdown from "react-native-select-dropdown";
import store from "../../../../store";
import { useSelector } from "react-redux";
import category_bottom from "../../../../assets/images/categroy_bottom.png";

export const ApplicationsDataScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const orders = route.params.orders;
  const store = useSelector((st)=>st.customer)
  const [status, setStatus] = useState([]);
  const [statusName, setStatusName] = useState(null);
  useEffect(() => {
    statusDataFetch();
  }, []);
  const statusDataFetch = async () => {
    try {
      const response = await axiosInstance.get("/orders/status");
      const arr = response.data;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === "approved") {
          arr[i].title = "Заказ принят";
        }
       else if (arr[i].name === "assembling") {
          arr[i].title = "Заказ в сборке";
        }
        else if (arr[i].name === "accepted") {
          arr[i].title = "Ожидает подтверждения";
        }
        else if (arr[i].name === "pending") {
          arr[i].title = "Ожидает подтвержден";
        }
        else if (arr[i].name === "in_transit") {
          arr[i].title = "Заказ в пути";
        }
        else if (arr[i].name === "completed") {
          arr[i].title = "Заказ завершен";
        }
        else if (arr[i].name === "cancelled") {
          arr[i].title = "Заказ отменен";
        }
      }
      setStatus(arr);
      setStatusFunc(arr);
    } catch (e) {
      console.log(e);
    }
  };
  const messageFunc = async () => {
    try {
      const response = await axiosInstance.get(`/chat/seller/is-created?buyer_id=${item?.user_id}`)
      navigation.navigate(MessagesName, {
        item: {
          _id: item?.user_id,
          seller_id:store._id,
          chatID: response?.data?.chatID
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const setStatusFunc = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === item.status_id.name) {
        setStatusName(arr[i])
      }
    }
  };
  const changeStatusFunc = async (it) => {
    setStatusName(it)
    const data = {
      status_id: it._id,
    };
    try {
      const response = await axiosInstance.post(`/orders/update-status?order_id=${item._id}`, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.scrollContainer]} bounces={false}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <View style={styles.headerContainer}>
        <View style={styles.headerPadding}>
          <BackButton
            text={"Заказ"}
            navigation={navigation}
            applications={item.N}
            stylesBack={styles.back}
          />
          <Text
            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignRight, item.state && ({ color: "#E38920" })]}>{item.state}</Text>
        </View>
        <View style={[styles.headerTextContainer, styles.headerPadding]}>
          {item.goods.map((item, index) => {
            return (
              <Text key={index}
                    style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.contentStyleText]}>x{item.count} {item.title}</Text>
            );
          })}
        </View>
        <View style={styles.headerBorderWidth}>
          <View style={[styles.headerPadding]}>
            <View style={[globalStyles.row, styles.between]}>
              <View>
                <View style={styles.contData}>
                  <Text
                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>На
                    когда</Text>
                  <Text>{item.delivery_date}</Text>
                </View>
                <View>
                  <Text
                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Телефон</Text>
                  <Text>{item.phone_number}</Text>
                </View>
              </View>
              <View>
                <View style={styles.contData}>
                  <Text
                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Время</Text>
                  <Text>{item.delivery_time}</Text>
                </View>
                <View>
                  <Text
                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Общая
                    сумма</Text>
                  <Text>{item.full_amount} р</Text>
                </View>
              </View>
            </View>
            <View style={styles.countryView}>
              <Text
                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Город</Text>
              <Text>{item.delivery_city}</Text>
            </View>
            <View style={styles.countryView}>
              <Text
                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Адрес</Text>
              <Text>{item?.count[0]?.addressAll} {item.delivery_address}</Text>
            </View>
            <View style={styles.countryView}>
              <Text style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Имя получателя</Text>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.countryView}>
              <Text
                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Коментарий</Text>
              <Text>{item.comment}</Text>
            </View>
          </View>
        </View>
      </View>
      {item.goods.map((item, index) => {
        return (
          <ApplicationsChangeForm
            item={item}
            key={index}
            index={index}
            navigation={navigation}
          />
        );
      })}
      <View style={styles.applicationsContainer}>
        <View style={styles.changeContent}>
          <View style={[globalStyles.row]}>
            <Image source={{uri:BaseUrl + '/' + route.params?.banner}} style={styles.imgForm} />
            <View style={styles.textCont}>
              <Text
                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Текст
                на открытке:</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.weightBold, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.priceText]}>{item.postcard}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.footerCont, globalStyles.row]}>
        <View>
          <View style={styles.dropCont}>
            <SelectDropdown
              data={status}
              buttonStyle={styles.btnStyleDrop}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={statusName?.title}
              rowTextStyle={styles.choosePhotoText}
              onSelect={(selectedItem) => {
                changeStatusFunc(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem.title;
              }} />
          </View>
          <View style={styles.catCont}>
            <Text style={[globalStyles.titleText,globalStyles.titleTextSmall,styles.textCat]}>{statusName?.title}</Text>
            <Image source={category_bottom} style={styles.category_bottom}/>
          </View>
        </View>

        <TouchableOpacity onPress={messageFunc}>

          <Image source={messageIcon} style={styles.messageIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

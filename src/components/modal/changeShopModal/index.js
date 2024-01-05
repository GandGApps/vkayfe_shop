import { styles } from "./styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import closeIcon from "../../../assets/images/closeIcon.png";
import axiosInstance from "../../../networking/axiosInstance";
import { BaseUrl, globalStyles, SET_CUSTOMER } from "../../../constants";
import place from "../../../assets/images/place.png";
import { useDispatch, useSelector } from "react-redux";
import { setStore } from "../../../utils";

export function ChangeShopModal(props) {
  const dispatch = useDispatch();
  const store = useSelector((st) => st.customer);
  const shop = store.activeStore
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const onChangeTextFunc = (e, set) => {
    setError("");
    set(e);
  };

  const axiosFuncChange = async (a) => {
    props.modalFunc(false)
    props.loadingFunc(true);
    try {
      const response = await axiosInstance.post(`/users/stores/active?store_id=${a._id}`);
      const country = {
        lat: response.data.store.lat,
        lon: response.data.store.lon,
        value: response.data.store.city,
        name: response.data.store.address, //adress
      }
      console.log(country)
      await setStore(country);
      store.active_store = a
      dispatch({
        type: SET_CUSTOMER,
        payload: store,
      });
      props.loadingFunc(false);
      props.modalFunc(false);
    } catch (e) {
      props.loadingFunc(false);
      props.modalFunc(true);
      console.log(e);
    }
  };

  return (
    <Modal
      visible={props.visible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      testID={"modal"}
      swipeDirection="down"
      backdropColor={"rgba(250, 250, 250, 0.5)"}
      backdropOpacity={1}
      onSwipeComplete={() => {
        props.modalFunc(false);
      }}
      onBackButtonPress={() => {
        props.modalFunc(false);
      }}>
      <View style={styles.modalContent}>
        <View style={styles.back_button_View}>
          <TouchableOpacity onPress={() => {
            props.modalFunc(false);
          }}>
            <Image source={closeIcon} style={styles.back_button} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
            {props.allShop.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.headerShop} onPress={() => axiosFuncChange(item)}>
                  <View key={index} style={[globalStyles.row, styles.contentShop]}>
                    <Image source={{ uri: BaseUrl + "/" + item.logo_url }} style={styles.shopIcon} />
                    <View style={styles.containerHeaderText}>
                      <Text
                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.magazine]}>Магазин</Text>
                      <Text
                        style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.textAlignLeft]}>{item?.title}</Text>
                      <View style={globalStyles.row}>
                        <Image source={place} style={styles.placeIcon} />
                        <Text
                          style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText]}>{item?.city} / {item.address}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerRight}>
                    <Text style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText, styles.idText]}>ID:{item?._id.substring(15)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

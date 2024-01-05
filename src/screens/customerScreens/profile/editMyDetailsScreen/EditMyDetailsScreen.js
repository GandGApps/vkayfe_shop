import React, { useState } from "react";
import { styles } from "./styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppButton, AppInput, BackButton, Loading, validateEmail } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { EditMyDetailsName, globalStyles, SaveEditProfileName, SET_CUSTOMER } from "../../../../constants";
import { email } from "npm/lib/utils/read-user-info";
import axiosInstance from "../../../../networking/axiosInstance";

export const EditMyDetailsScreen = ({ navigation }) => {
  const store = useSelector((st) => st.customer);
  const dispatch = useDispatch();
  const [name, setName] = useState(store.name);
  const [email, setEmail] = useState(store.email);
  const [phone, setPhone] = useState(store.phone_number);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const onPressFunc = async () => {
    if (name && phone.length >= 8 && validateEmail(email)) {
      await axiosFunc();
    } else if (!validateEmail(email)) {
      setError("email incorrect");
    } else if (phone.length  < 8) {
      setError("phone incorrect");
    } else if (!name) {
      setError("name incorrect");
    }
  };

  const axiosFunc = async () => {
    setLoading(true);
    try {
      const data = {
        phone_number: phone,
        email,
        name,
      };
      const response = await axiosInstance.put("/users/profile/seller", data);
      dispatch({
        type: SET_CUSTOMER,
        payload: response.data.user_data,
      });
      navigation.navigate(SaveEditProfileName);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onChangeTextFunc = (e, set) => {
    set(e);
    setError("");
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View style={styles.contentMyDetailsAll}>
        <View>
          <BackButton
            navigation={navigation}
            stylesBack={styles.stylesBack}
          />
          <AppInput
            placeholder={"Имя"}
            style={styles.input}
            defaultValue={store.name}
            onChangeText={(e) => {
              onChangeTextFunc(e, setName);
            }}
          />
          <AppInput
            placeholder={"Email"}
            style={styles.input}
            defaultValue={store.email}
            onChangeText={(e) => {
              onChangeTextFunc(e, setEmail);
            }}
          />
          <AppInput
            placeholder={"Телефон"}
            style={styles.input}
            keyboardType={"numeric"}
            defaultValue={store.phone_number}
            onChangeText={(e) => {
              onChangeTextFunc(e, setPhone);
            }}
          />
          <View style={styles.contentMyDetails}>
            <Text style={styles.contentMyDetailsText}>{store.ip}</Text>
          </View>
          <View style={styles.contentMyDetails}>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.contentMyDetailsText]}>{store.legal_name}</Text>
          </View>
          <View style={styles.contentMyDetails}>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.contentMyDetailsText]}>{store.inn}</Text>
          </View>
          <View style={styles.contentMyDetails}>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.contentMyDetailsText]}>{store.ogrn}</Text>
          </View>
          <View style={styles.contentMyDetails}>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.contentMyDetailsText]}>{store.bill_number}</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View>
          <View style={styles.appBtnView}>
            <AppButton
              text={"Назад"}
              stylesContainer={styles.appBtnContainer}
              stylesText={styles.appBtnText}
              onPress={() => navigation.goBack()}
            />
            <AppButton
              text={"Сохранить"}
              onPress={() => onPressFunc()}
            />
          </View>
        </View>
      </View>
      <Loading loading={loading} />
    </ScrollView>
  );
};

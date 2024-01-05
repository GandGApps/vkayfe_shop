import React, { useState } from "react";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles, SET_CUSTOMER, SignupName } from "../../constants";
import { AppButton, BackButton } from "../core";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import axiosInstance from "../../networking/axiosInstance";
import { checkUser } from "../../utils";
import { Loading } from "../loading";
import { approvedData, deniedData, pendingData } from "../data";

export function WaitingForm({ data }) {
  const user_data = useSelector((st) => st.customer);
  const dispatch = useDispatch()
  const [loading,setLoading] = useState()
  const onPressMainBtn = async () => {
    if (data.pending) {
      await axiosFunc();
    } else {
      data.navigation.replace(data.navigationName);
    }
  };

  const axiosFunc = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/users/profile/seller");
      dispatch({
        type: SET_CUSTOMER,
        payload: response.data.user_data,
      });
        checkUser(response?.data?.user_data,data.navigation,data.title);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View>
        {data?.back && (
          <BackButton
            navigation={data.navigation}
            pending={data.pending}
            denied={data.denied}
          />
        )}
      </View>
      <View style={styles.characterContainer}>
        <Image source={data?.character} style={styles.character} />
        <Text style={[globalStyles.titleText, styles.titleText]}>
          {data.title}
          {data.textAprrove ? null : <Text style={globalStyles.weightBold}>{user_data.message_from_admin}</Text>}
        </Text>
      </View>
      <View>
        {data?.choose && (
          <View>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Нет аккаунта?</Text>
            <TouchableOpacity onPress={() => data.navigation.replace(SignupName)}>
              <Text
                style={[globalStyles.titleText, globalStyles.weightBold, styles.chooseTextBold]}> Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        )}
        {
          data?.deleteText && (
            <AppButton
              text={data.deleteText}
              onPress={() => data?.deleteFunc()}
              stylesContainer={data?.deleteBtnStyle}
            />
          )
        }
        <AppButton
          text={data.btnText}
          onPress={onPressMainBtn}
          stylesContainer={data?.styleBtn}
          stylesText={data?.styleBtnText}
        />
      </View>
      <Loading loading={loading}/>
    </View>
  );
}

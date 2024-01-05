import React, { useState } from "react";
import { styles } from "./styles";
import { View } from "react-native";
import { approvedData, DeleteShopData, Loading, WaitingForm } from "../../../../components";
import { ProfileScreenName, SET_CUSTOMER, WaitingName } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

export const DeleteShopScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const store = useSelector(st => st.customer);
  const [loading, setLoading] = useState(false);
  const deleteFunc = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/stores/my/?store_id=${route.params.id}`);
      dispatch({
        type: SET_CUSTOMER,
        payload: response.data.seller,
      });
      setLoading(false);
      if (!response.data.seller.active_store) {
        navigation.replace(WaitingName, {data: approvedData });
      } else {
        navigation.replace(ProfileScreenName);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const data = {
    ...DeleteShopData,
    navigation,
    deleteFunc,
  };

  return (
    <View style={styles.container}>
      <WaitingForm
        data={data}
      />
      <Loading loading={loading} />
    </View>
  );
};

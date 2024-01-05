import React, { useState } from "react";
import { styles } from "./styles";
import {  View } from "react-native";
import { SaveItemData, WaitingForm } from "../../../../components";
import {  AddScreenName } from "../../../../constants";


export const SaveItemScreen = ({ navigation }) => {
  const newItemFunc = () => {
    navigation.replace(AddScreenName)
  };
  const data = {
    ...SaveItemData,
    deleteFunc:newItemFunc,
    navigation,
  };

  return (
    <View style={styles.container}>
      <WaitingForm
        data={data}
      />
    </View>
  );
};

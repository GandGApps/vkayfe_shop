import React from "react";
import { styles } from "./styles";
import { View } from "react-native";
import { WaitingForm } from "../../../components";
import { globalStyles } from "../../../constants";


export const WaitingScreen = ({ navigation, route }) => {
  const data = {
      ...route.params.data,
      navigation
  }
  return (
    <View style={globalStyles.container}>
      <WaitingForm
        data={data}
      />
    </View>);
};

import React from "react";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { removeTokens } from "../../../utils";
import { globalStyles, SET_CUSTOMER_DELETE, SignInName } from "../../../constants";
import backBtn from "../../../assets/images/backIcon.png";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { globalWidth } from "../../dimensions";
async function removeStore() {
  try {
    await AsyncStorage.removeItem("state");
    return true;
  }
  catch(exception) {
    return false;
  }
}

export function BackButton({ navigation, text, pending, denied, stylesBack, deleteAll, applications,textStyle }) {
  const dispatch = useDispatch();
  const goBackFunc = async () => {
    if (pending) {
      await removeTokens();
      await removeStore()
      dispatch({
        type: SET_CUSTOMER_DELETE,
      });
      navigation.replace(SignInName);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, stylesBack, globalStyles.row]}>
      <TouchableOpacity onPress={goBackFunc} style={[globalStyles.row,styles.textCont]}>
        <Image source={backBtn} style={styles.backBtnStyle} />
        {text && (<Text style={[styles.text,textStyle && ({  fontSize: globalWidth(17),})]}>{text}</Text>)}
      </TouchableOpacity>
      {deleteAll && (
        <TouchableOpacity onPress={deleteAll}>
          <Text style={[globalStyles.titleText, styles.textDelete]}>ОЧИСТИТЬ ВСЕ</Text>
        </TouchableOpacity>
      )}
      {applications && (
        <Text
          style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>{applications}</Text>
      )}
    </View>

  );
}

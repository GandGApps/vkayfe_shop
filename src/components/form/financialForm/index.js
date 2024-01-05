import React from "react";
import { styles } from "./styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import winIcon from "../../../assets/images/winIcon.png";
import { SwitchTogglesCustom } from "../../switchTogglesCustom";
import { FinancialReportDataName, globalStyles } from "../../../constants";

export function FinancialForm({ item, index,navigation }) {
  console.log(item)
  return (
    <View style={styles.containerForm}>
      <View style={styles.contentView}>
        <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall]}>Заказ № {item?._id.substring(15)}</Text>
        <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall]}>{item.delivery_date}</Text>
      </View>
      <View style={[styles.contentView, styles.centerView]}>
        <Text style={[globalStyles.titleText]}>{item.income} р</Text>
        <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall]}>{item.delivery_time}</Text>
      </View>
      <View style={styles.contentView}>
        <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall,
          { color: item.paid ? "#138F2E" : "#E79800" },
        ]}>{item.paid ? "Выплата произведена" : 'Ожидается выплата'}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(FinancialReportDataName,{item})}>
          <Text style={[globalStyles.titleText,globalStyles.weightLight ,styles.textPod]}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

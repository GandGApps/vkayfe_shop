import React from "react";
import { styles } from "./styles";
import { Text, TouchableOpacity,View } from "react-native";
import { ApplicationsDataName, globalStyles } from "../../../constants";

export const ApplicationsForm = ({ item,navigation,orders,banner }, index) => {

  return (
    <TouchableOpacity style={styles.applicationsContainer} onPress={()=>navigation.navigate(ApplicationsDataName,{item,orders,banner})}>
      <View style={[globalStyles.row,styles.rowCont]}>
        <Text style={[globalStyles.titleText,globalStyles.titleTextSmall4,globalStyles.textAlignLeft,globalStyles.weightLight,styles.name]}>№ {item._id.substring(15)}</Text>
        <Text style={[globalStyles.titleText,globalStyles.titleTextSmall4,globalStyles.textAlignLeft,globalStyles.weightLight,item.status_id.name === 'completed' ? {color:'green'} : {color:'#E79800'}]}>{item.status_id.title}</Text>
      </View>
      <View style={styles.applContent}>
        <Text style={[globalStyles.titleText,globalStyles.titleTextSmall,globalStyles.textAlignLeft,styles.name]}>{item.postcard}</Text>
        <Text style={[globalStyles.titleText,globalStyles.titleTextSmall,globalStyles.textAlignLeft,]}>{item.title}</Text>
      </View>
      <View style={[globalStyles.row,styles.rowCont]}>
        <Text style={[globalStyles.titleText,globalStyles.titleTextSmall4,globalStyles.textAlignLeft,globalStyles.weightLight,styles.name]}>{item.delivery_time}</Text>
        <Text style={[globalStyles.titleText,globalStyles.weightBold]}>{item.income} р</Text>
      </View>
    </TouchableOpacity>
  );
};

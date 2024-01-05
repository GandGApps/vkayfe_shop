import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants";
import { globalHeight, globalWidth } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  text:{
    marginHorizontal:globalWidth(15),
    marginVertical:globalWidth(20),
    fontSize:globalWidth(16),
    fontWeight:'400',
    lineHeight:globalWidth(21),
    textAlign:'left'
  }

});

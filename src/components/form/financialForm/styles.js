import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants";
import { globalHeight, globalWidth } from "../../index";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  containerForm:{
    borderBottomWidth:1,
    borderBottomColor:Colors.lightGray,
    paddingVertical:globalHeight(14)
  },
  contentView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:globalWidth(20),
  },
  textPod:{
    fontSize:globalWidth(12),
    textDecorationLine:'underline'
  },
  centerView:{
    marginBottom:globalHeight(21),
    marginTop:globalHeight(13)

  }
});

import { Colors } from "../../../constants";
import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../index";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  applicationsContainer:{
    marginHorizontal:globalWidth(20),
    paddingHorizontal:globalWidth(13),
    borderWidth:1,
    borderColor:Colors.gray,
    borderRadius:8,
    marginBottom:globalHeight(9),
    paddingVertical:globalHeight(9)
  },
  rowCont:{
    justifyContent:"space-between",
  },
  applContent:{
    marginBottom:globalHeight(30),
    marginTop:globalHeight(13)
  }
});

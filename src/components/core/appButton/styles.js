import { Colors } from "../../../constants";
import { globalHeight } from "../../dimensions";
import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  containerButton: {
    borderRadius: 8,
    marginHorizontal:20,
    alignItems: "center",
    justifyContent: "center",
    height: globalHeight(52),
    backgroundColor: Colors.tifany,
  },
  text:{
    color:Colors.white,
    lineHeight: globalHeight(20),

  }
});

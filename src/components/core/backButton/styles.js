import { Colors } from "../../../constants";
import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../dimensions";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  backBtnStyle: {
    width: globalWidth(15),
    height: globalHeight(21),
    resizeMode: "contain",
  },

  text: {
    marginLeft: globalWidth(23),
    fontWeight: "600",
    color: Colors.titleColor,
    fontSize: globalWidth(25),
    textAlign: "left",
  },
  container: {
    justifyContent: "space-between",
    marginHorizontal: globalWidth(20),
  },
  textDelete: {
    fontSize: globalWidth(10),
  },
  textCont: {
  },
});

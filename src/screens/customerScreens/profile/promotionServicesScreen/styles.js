import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "relative",
  },
  backContainer: {
    zIndex: 1,
    position: "absolute",
    top: globalHeight(20),
  },
  pinkMonster: {
    width: width,
    height: height / 2,
    position: "relative",
  },
  titleText: {
    marginTop: globalHeight(45),
  },
  contentText: {
    marginTop: globalHeight(30),
    marginHorizontal: globalWidth(50),
  },

  activeContainer: {
    marginTop: globalHeight(29),
  },
  containerBtn: {
    marginVertical: globalHeight(20),
  },
  activeTextState:{
    color: "green",
    marginBottom: globalHeight(5),
  },
  activeText: {
    color: Colors.NoActiveColor,
    marginBottom: globalHeight(5),
  },
});

import { Colors } from "../../../constants";
import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../components";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  headerContainer: {
    position: "relative",
  },
  pinkMonster: {
    width: width,
    height: height / 2,
    position: "relative",
  },
  lineImg: {
    marginTop: -1,
    height: height/1.8,
    width: globalWidth(82)
  },
  formContainer: {
    left: 0,
    right: 0,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    top: height / 2 + globalHeight(-47),
  },
  backContainer: {
    zIndex: 1,
    position: "absolute",
    top: globalHeight(30),
  },
  linePink: {
    width: 82,
    height: "100%",
    borderWidth: 1,
  },
  linePinkContainer: {
    flex: 1,
    borderWidth: 1,
    height: height / 2,
  },
  formHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: globalHeight(28),
  },
  giftIconPink: {
    width: globalWidth(29),
    height: globalWidth(29),
  },
  titleForm: {
    marginLeft: globalWidth(9),
  },

  SignInTextBold: {
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  footerContainer: {
    marginVertical: globalHeight(32),
  },
  inputContainer: {
    marginVertical: globalHeight(20),
  },
  input: {
    marginVertical: globalWidth(10),
  },
  error:{
    marginLeft:20,
    fontSize:12,
    marginVertical:5,
    color:Colors.red
  }
});

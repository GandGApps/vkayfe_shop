import { Colors } from "../../../constants";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { globalHeight, globalWidth } from "../../../components";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: "center",
    marginTop: globalHeight(40),
  },
  cameraContent: {
    borderWidth: 1.6,
    borderRadius: 12,
    alignItems: "center",
    borderColor: Colors.blue,
    justifyContent: "flex-end",
    width: globalWidth(229),
    height: globalWidth(229),
    backgroundColor: Colors.lightBlue,
  },
  cameraImg: {
    width: globalWidth(82),
    height: globalHeight(68),
    resizeMode: "contain",
  },
  cameraText: {
    color: Colors.gray,
    maxWidth: globalWidth(170),
    marginVertical: globalHeight(25),
  },
  buttonContainer: {
    borderRadius: 5,
    height: globalHeight(40),
    marginTop: globalHeight(9),
    paddingHorizontal: globalWidth(18),
  },
  imageNameContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: globalHeight(15),
  },
  closeIcon: {
    width: globalWidth(10),
    height: globalWidth(10),
  },
  contentMyDetails: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColorLight,
    marginBottom: globalHeight(34),
    marginHorizontal: globalWidth(20),
  },
  contentMyDetailsText: {
    color: Colors.gray,
    marginBottom: globalHeight(8),
  },
  logoText: {
    color: Colors.gray,
    fontSize: globalHeight(16),
    textDecorationLine: "underline",
    marginRight: globalWidth(12),
  },

  closeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: globalHeight(35),
  },
  contentContainer: {
    borderBottomWidth: 1.5,
    borderColor: Colors.lightGray,
  },
  btnStyle: {
    marginVertical: globalHeight(20),
  },
  inputBig: {
    paddingTop: 0,
    borderWidth: 1,
    paddingBottom: 0,
    marginBottom: globalHeight(50),
    textAlignVertical: "top",
    height: globalHeight(139),
    borderRadius: 8,
  },
  inputBigText: {
    marginLeft: globalWidth(20),
    marginBottom: globalHeight(3),
    textAlign: "left",
  },
  containerImg: {
    width: globalWidth(229),
    height: globalWidth(229),
    borderRadius: 12,
  },
  choosePhotoText: {
    color: Colors.black,
    marginTop: 7,
  },
  btnStyleDrop: {
    width: width - globalWidth(40),
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderRadius: 6,
    borderColor: Colors.borderGray,
  },

  dropCont: {
    alignItems: "center",
    marginBottom: globalHeight(35),
  },
  backBtn: {
    paddingTop:Platform.OS === 'ios' ? globalHeight(25) : 0

  },
  TextTaxi: {
    color: Colors.gray,
    marginHorizontal: globalWidth(20),
    marginTop:globalHeight(10)
  },
  btn:{
    backgroundColor:'transparent',
    borderColor:Colors.borderGray,
    borderWidth:1,
    marginBottom:globalHeight(20)
  },
  stylesText:{
    color:Colors.gray,
  },
  graphic:{
    marginLeft:globalWidth(20)
  },
  bottomIcon:{
    width:globalWidth(10),
    height:globalHeight(14),
    resizeMode:'contain'
  },
  graphicContainer:{
    marginHorizontal:globalWidth(20),
    justifyContent:"space-between",
    marginTop:globalHeight(20)
  },
  graphicTime:{
    marginHorizontal:globalWidth(20)
  },
  graphicContent:{
    borderBottomWidth: 1,
    borderColor: Colors.borderGray,
    paddingVertical:globalHeight(4)
  },
  activeTextCont:{
    borderWidth:1,
    borderColor:Colors.borderColorLight
  }
});

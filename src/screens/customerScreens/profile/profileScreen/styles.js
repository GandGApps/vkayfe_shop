import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({

  headerContainer: {
    paddingTop: globalHeight(38),
    paddingBottom: globalHeight(14),
    backgroundColor: Colors.blueBackground,
    paddingHorizontal: globalWidth(20),
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: globalWidth(35),
    paddingRight: globalWidth(20),
    paddingVertical: globalHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },

  headerShop: {

    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.borderGray,
    position: "relative",
    marginTop:globalWidth(5)
  },
  shopIcon: {
    width: globalWidth(65),
    height: globalWidth(65),
    borderRadius: 8,
    marginRight: globalWidth(11),
  },
  RightIcon: {
    width: globalWidth(13),
    height: globalHeight(19),
    resizeMode: "contain",
  },
  activeTextHeader: {
    marginBottom: globalHeight(5),
    fontSize:globalWidth(12)
  },
  activeText: {
    color: Colors.NoActiveColor,
    marginBottom: globalHeight(5),
  },
  activeInActiveContainer: {
    backgroundColor: Colors.activeBackground,
    borderBottomWidth: 0,
  },
  magazine: {
    fontSize:globalWidth(12),
    fontWeight:"400",
    lineHeight:18,
    color:'#213F50'
  },
  shopName:{
    fontSize:globalWidth(16),
    fontWeight:"600",
    lineHeight:24,
    color:'#213F50',
  },
  placeTextNew:{
    fontSize:globalWidth(12),
    fontWeight:"400",
    lineHeight:18,
    color:'#213F50'
  },
  placeIcon: {
    width: globalWidth(9),
    height: globalHeight(12),
    resizeMode: "contain",
    marginRight: globalWidth(9),
    tintColor:'#0BC5BA'
  },
  containerHeaderText: {
    justifyContent: "space-between",
  },
  placeText: {
    fontSize: globalHeight(12),
    lineHeight: globalHeight(15),

  },
  containerRight: {
    position: "absolute",
    right: globalWidth(3),
    top: globalHeight(20),
    alignItems: "flex-end",
  },
  idText: {
    marginBottom: globalHeight(8),
  },
  bottomIcon: {
    width: globalWidth(6),
    height: globalHeight(8),
    resizeMode: "contain",
    marginLeft: globalWidth(3),

  },
  headerFooterText: {
    color: Colors.blueText,
    fontSize: globalHeight(15),
    lineHeight: globalHeight(20),
    textDecorationLine: "underline",
  },
  addShopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:globalHeight(14)
  },
  changeShop: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeColorStyle: {
    color:Colors.green
  },
  RightIconCont:{
    width: globalWidth(30),
    height: globalHeight(40),
    alignItems:'flex-end',
    justifyContent:'center'
  },
  activeTextState:{
    color: "green",
    marginBottom: globalHeight(5),
  }
});

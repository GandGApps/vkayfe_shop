import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../dimensions";
import { Colors } from "../../../constants";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  modalContent: {
    elevation: 10,
    borderRadius: 15,
    shadowRadius: 15,
    shadowOpacity: 0.34,
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    paddingVertical: globalHeight(20),
  },
  back_button_View: {
    alignItems: "flex-end",
    marginRight: globalWidth(20),
    marginBottom:globalHeight(10)
  },
  back_button: {
    width: globalHeight(20),
    height: globalHeight(20),
    resizeMode: "contain",
  },
  contScroll:{
    justifyContent:'space-between',
    paddingHorizontal:globalWidth(20)
  },
  scroll:{
    height:globalHeight(250)
  },
  nameTime:{
    marginVertical:globalHeight(10),
    paddingVertical: globalHeight(10),
    borderBottomColor:Colors.borderGray,
    borderBottomWidth:1,
    width:globalWidth(80)
  },
  inp:{
    textAlign:'center',
  },
  container:{
    marginTop:globalHeight(50)
  }
});

import {StyleSheet, Dimensions} from 'react-native';
import { globalHeight, globalWidth } from "../dimensions";
import { Colors } from "../../constants";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  switchInfoView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: {
    marginBottom:globalHeight(4)
  },
  customSwitch: {
    borderRadius: 25,
    width: globalWidth(40),
    padding: globalWidth(3),
    height: globalHeight(20),
    paddingLeft: globalWidth(2),
  },
  chekedIc: {
    borderRadius: 25,
    width: globalWidth(40),
    padding: globalWidth(2),
    height: globalHeight(20),
    paddingLeft: globalWidth(2),
  },
  customDot: {
    borderRadius: 10,
    width: globalWidth(16),
    height: globalHeight(16),
  },
  img:{
      width:globalWidth(10),
      height:globalWidth(10),
    marginRight:globalWidth(5)
  },
  imgContainer:{
    flexDirection:'row',
    alignItems:'center',

  }
});

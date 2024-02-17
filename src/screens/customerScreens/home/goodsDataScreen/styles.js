import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants";
import { globalHeight, globalWidth } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  content:{
    paddingHorizontal:globalWidth(22),
    paddingTop:globalHeight(37)
  },
  cont:{
    justifyContent:'space-between',
    flex:1
  },
  imgHeader:{
    width:width,
    height:height/2.3
  },
  textCont:{
    fontSize:globalWidth(25),
    lineHeight:globalHeight(30)
  },
  rowCont:{
    justifyContent:'space-between',
    paddingTop:globalHeight(12)
  },
  timeContainer:{
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:Colors.borderColorLight,
    paddingVertical:globalHeight(13),
    marginTop:globalHeight(33),
    marginBottom:globalHeight(10)
  },
  taxiContainer:{
    borderBottomWidth:1,
    borderColor:Colors.borderColorLight,
    paddingBottom:globalHeight(13),
    marginBottom:globalHeight(10)
  },
  grayText:{
    color:Colors.gray
  },
  ops:{
    marginBottom:globalHeight(7)
  },
  idText:{
    marginVertical:globalHeight(25)
  },
  btnCont:{
    backgroundColor:'transparent',
    borderColor:Colors.black,
    borderWidth:1,
    marginVertical:globalHeight(20)
  },
  btnText:{
    color:Colors.black
  },
  btnView:{
    borderTopWidth:1,
    borderTopColor:Colors.borderGray
  },
  linearGradient:{
    position:'relative'
  },
  bckCont:{
    position:'absolute',
    top:Platform.OS === 'ios' ? globalHeight(60) :  globalHeight(30),
    left:globalWidth(30),
    zIndex:50
  },
  bckContCircle:{
    position:'absolute',
    bottom:globalHeight(0),
    left:0,
    right:0,
    zIndex:50
  },
  bckImg:{
    width:globalWidth(20),
    height:globalHeight(26),
    resizeMode:'contain',
  }
});

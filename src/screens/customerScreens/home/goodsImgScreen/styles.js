import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants";
import { globalHeight, globalWidth } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  containerImg: {
    backgroundColor: Colors.titleColor,
    alignItems: "center",
    justifyContent: "center",
    position:'relative'
  },
  img: {
    width: width,
    height: height / 2.5,
  },
  bckCont:{
    position:'absolute',
    top:globalHeight(21),
    left:globalWidth(17),
    zIndex:10
  },
  bckImg:{
    width:globalWidth(17),
    height:globalHeight(23),
    resizeMode:'contain'
  },
  containerImgCarousel:{
    // width: width,
    // height:height,
    // justifyContent:'space-between'
  },
  colorText:{
    fontSize:globalWidth(20),
    color:Colors.white,
    position:'absolute',
    bottom:globalHeight(30)
  }
});

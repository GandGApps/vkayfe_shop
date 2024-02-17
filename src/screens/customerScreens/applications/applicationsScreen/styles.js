import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: globalHeight(13),
    backgroundColor: Colors.blueBackground,
    marginBottom:globalHeight(17)
  },
  headerFooter: {
    justifyContent: "space-between",
    marginTop: globalWidth(15),
    paddingHorizontal: globalWidth(40),

  },
  headerFooterText: {
    color: Colors.gray,
  },
  activeText: {
    borderBottomWidth: 1,
    paddingBottom: globalWidth(7),
    color: Colors.titleColor,
  },
  activeTextContent: {
    color: Colors.black,
  },
  container:{
    marginBottom:globalHeight(23)
  },
  textZakaz:{
    marginLeft:globalWidth(20),
  },
  noDataText:{
    width:globalWidth(262),
    textAlign:'left',
    marginLeft:globalWidth(31),
    color:Colors.gray
  }
});

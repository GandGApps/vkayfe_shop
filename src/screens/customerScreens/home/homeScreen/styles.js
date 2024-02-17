import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants";
import { globalHeight, globalWidth } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({

  headerContainer: {
    backgroundColor: Colors.backgroundBLightBlue,
    paddingHorizontal: globalWidth(15),
    paddingBottom: globalHeight(20),
  },
  prod:{
    lineHeight: globalHeight(20),
    textAlign:'center',
    marginTop:globalWidth(3)
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingTop: globalHeight(32),
    justifyContent: "space-between",
    paddingBottom: globalHeight(9),
    borderBottomColor: Colors.borderGray,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalHeight(9),
    marginBottom: globalHeight(9),
  },
  filterContainer: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.tifany,
    paddingVertical: globalHeight(8),
    paddingHorizontal: globalHeight(13),
  },
  filterContainerFill:{
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.tifany,
    paddingVertical: globalHeight(8),
    paddingHorizontal: globalHeight(13),
    marginHorizontal: globalHeight(13),
  },
  bottomIconStyle: {
    resizeMode: "contain",
    width: globalWidth(7),
    height: globalHeight(12),
  },
  filterIconStyle: {
    resizeMode: "contain",
    width: globalWidth(18),
    height: globalHeight(14),
  },
  filterTextStyle: {
    marginRight: globalWidth(14),
  },
  winIconStyle: {
    width: globalWidth(20),
    height: globalWidth(20),
    resizeMode:'contain'
  },
  HeaderFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerFooterText: {
    marginLeft: globalWidth(4),
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
  },
  formContent: {
    flex: 1,
    width: width,
    paddingHorizontal:globalWidth(15)
  },

});

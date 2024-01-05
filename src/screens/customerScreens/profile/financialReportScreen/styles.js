import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({

  headerContainer: {
    backgroundColor: Colors.backgroundBLightBlue,
    paddingVertical: globalHeight(16),
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
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalHeight(22),
    marginHorizontal:globalWidth(20),
    justifyContent: "space-between",
    marginBottom: globalHeight(10),
  },
  filterIconStyle: {
    resizeMode: "contain",
    width: globalWidth(20),
    height: globalHeight(16),
  },
  filterTextStyle: {

    marginRight: globalWidth(14),
  },


});

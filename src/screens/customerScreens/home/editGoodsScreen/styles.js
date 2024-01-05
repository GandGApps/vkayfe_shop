import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants";
import { globalHeight, globalWidth } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({

  headerContainer: {
    backgroundColor: Colors.blueBackground,
  },
  addText: {
    marginLeft: globalWidth(27),
    fontWeight: "600",
    color: Colors.titleColor,
    fontSize: globalWidth(25),
    marginBottom: globalHeight(43),
    marginTop: globalHeight(13),
  },
  category_bottom:{
    width:globalWidth(11),
    height:globalHeight(11),
    resizeMode:'contain',
    // borderWidth:1,
  },
  textCat:{
    color: Colors.gray,
    paddingVertical: globalHeight(9),
    width:"100%",
  },
  imgCont: {
    position: "relative",
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  AddPhotoContainer: {
    width: globalWidth(94),
    height: globalWidth(94),
    borderWidth: 1.6,
    borderRadius: 12,
    borderColor: Colors.blue,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:globalWidth(13)
  },
  opacityView:{
    opacity:0,
    zIndex:100
  },
  btnBtn:{
    marginBottom: globalHeight(20),
  },
  photosContainer: {
    width: globalWidth(94),
    height: globalWidth(94),
    borderRadius: 12,
    marginHorizontal: globalWidth(10),
  },
  iconCameraStyle: {
    width: globalWidth(45),
    height: globalHeight(35),
    resizeMode: "contain",
  },
  contScroll: {
    marginVertical: globalHeight(10),
  },
  loadingText: {
    marginTop: globalHeight(20),
    marginBottom:globalHeight(8),
    color: Colors.gray,
  },
  inputContainer: {
    marginBottom: globalHeight(30),
  },
  content: {
    paddingTop: globalHeight(23),
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
  btnStyle: {
    marginBottom: globalHeight(20),
    backgroundColor:'#F37171',

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
    textAlign: "left",
  },
  dropCont: {
    alignItems: "center",
    marginBottom: globalHeight(20),
    position:'relative'
  },
  catCont:{
    borderBottomWidth:1,
    borderColor: Colors.lightGray,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:globalWidth(25),
    position:'absolute',
    paddingRight:globalWidth(20)
  },
  titleInp: {
    marginLeft: globalWidth(20),
  },
  modalChangeBtn: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: globalWidth(20),
    paddingVertical: globalHeight(9),
  },
  closeIcon: {
    width: globalWidth(11),
    height: globalWidth(11),
  },
  closeCont: {
    width: globalWidth(20),
    height: globalWidth(20),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: globalWidth(10),
    zIndex: 10,
  },
  activeContainer:{
    marginHorizontal:globalWidth(20),
    marginBottom:globalWidth(15)
  },
  imgAct:{
    width:globalWidth(18),
    height:globalWidth(18),
    marginRight:globalWidth(6)
  },
  btnAdd:{
    width:globalWidth(28),
    height:globalWidth(28),
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    position:'absolute',
  },
  textAdd:{
    color:Colors.titleColor,
    fontSize:globalWidth(20),
    textAlign:'center'
  },
  absl:{
    right:globalWidth(20),
    zIndex:1000
  },
  abslleft:{
    left:globalWidth(20),
    zIndex:1000
  },
  addCont:{
    textAlign:"center",
    marginBottom: globalHeight(30),
  },
  vremyaStyle:{
    borderBottomWidth:1,
    borderBottomColor:Colors.borderGray,
    marginHorizontal:globalWidth(20),
    alignItems:'center',
    paddingVertical:globalHeight(5)
  }
});

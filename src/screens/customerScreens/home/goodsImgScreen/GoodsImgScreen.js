import React,{useState} from "react";
import { styles } from "./styles";
import { globalStyles } from "../../../../constants";
import { Dimensions, Image, TouchableOpacity, View,Text } from "react-native";
import backWhite from '../../../../assets/images/backWht.png'
import Carousel from "react-native-snap-carousel";
import { ImgForm } from "../../../../components";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export const GoodsImgScreen = ({ navigation, route }) => {
  const [data] = route.params.data;
  const activeIndex = route.params.activeIndex
  const [index,setIndex] = useState(activeIndex)
  const [visible, setIsVisible] = useState(false);


  return (
    <View style={[globalStyles.container,styles.containerImg]}>
      {/*<TouchableOpacity style={styles.bckCont} onPress={()=>navigation.goBack()}>*/}
      {/*  <Image source={backWhite} style={styles.bckImg}/>*/}
      {/*</TouchableOpacity>*/}
      {/*<View style={styles.containerImgCarousel}>*/}
      {/*  <Carousel*/}
      {/*    inactiveSlideOpacity={0.6}*/}
      {/*    inactiveSlideScale={0.65}*/}
      {/*    firstItem={0}*/}
      {/*    sliderWidth={width}*/}
      {/*    itemWidth={width}*/}
      {/*    onSnapToItem={(index) => setIndex(index)}*/}
      {/*    data={data}*/}
      {/*    renderItem={({ item, i }) => {*/}
      {/*      return (*/}
      {/*        <ImgForm*/}
      {/*          item={item}*/}
      {/*          index={i}*/}
      {/*          data={data}*/}
      {/*          setIndex={setIndex}*/}
      {/*          indexActive={index}*/}
      {/*        />);*/}
      {/*    }}*/}
      {/*    containerCustomStyle={{ overflow: "visible" }}*/}
      {/*    contentContainerCustomStyle={{ overflow: "visible" }}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<Text style={styles.colorText}>{index} - {data.length}</Text>*/}
      {/*<ImageView*/}
      {/*  images={[*/}
      {/*    {*/}
      {/*      source: {*/}
      {/*        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',*/}
      {/*      },*/}
      {/*      width: width,*/}
      {/*      height: height/2,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      source: {*/}
      {/*        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',*/}
      {/*      },*/}
      {/*      width: width,*/}
      {/*      height: height/2,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      source: {*/}
      {/*        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',*/}
      {/*      },*/}
      {/*      width: width,*/}
      {/*      height: height/2,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  imageIndex={index}*/}
      {/*  onRequestClose={() => setIsVisible(false)}*/}
      {/*  isVisible={true}*/}
      {/*  renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}*/}
      {/*/>*/}
    </View>
  );
};

import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { EditGoodsName, globalStyles } from "../../../../constants";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useStore } from "react-redux";
import { AppButton, ImgForm } from "../../../../components";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import backWhite from "../../../../assets/images/backWht.png";
import ImageView from "react-native-image-viewing";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const GoodsDataScreen = ({ navigation, route }) => {
  const store = useSelector((st) => st.customer);
  const [activeIndex,setActiveIndex] = useState(0)
  const [active,setActive] = useState(false)
  const data = route.params.item;

  const closeModal = () => { if (active) {
    setActive(false) } }

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View style={styles.cont}>
        <View>
          <LinearGradient
            start={{ x: 0.0, y: 0.05 }}
            end={{ x: 0, y: 1.0 }}
            locations={[0, 0.5, 0.6]}
            colors={["rgba(6, 6, 6, 0.54)", "rgba(0, 0, 0, 0.00)"]}
            style={styles.linearGradient}>
            <TouchableOpacity style={styles.bckCont} onPress={() => navigation.goBack()}>
              <Image source={backWhite} style={styles.bckImg} />
            </TouchableOpacity>

                {/*<ImageView*/}
                {/*  glideAlways*/}
                {/*  images={data.photo_list}*/}
                {/*  imageIndex={activeIndex}*/}
                {/*  isVisible={active}*/}
                {/*  animationType={"fade"}*/}
                {/* // onRequestClose={closeModal}*/}
                {/*  onClose={(e) => setActive(false)}*/}
                {/*  //onSwipeUp={() => closeModal() }*/}
                {/*  renderFooter={(currentImage) => (<View></View>)}*/}

                {/*/>*/}

          <ImageView
              images={data.photo_list}
              imageIndex={activeIndex}
              visible={active}
              onRequestClose={() => setActive(false)}
            />
            <Carousel
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={0.65}
              firstItem={0}
              sliderWidth={width}
              itemWidth={width}
              data={data.photo_list}
              useScrollView={true}
              onSnapToItem={(i) =>setActiveIndex(i)}
              renderItem={({ item, i }) => {
                return (
                  <ImgForm
                    item={item}
                    index={i}
                    data={data.photo_list}
                    navigation={navigation}
                    indexActive={activeIndex}
                    setActive={setActive}
                  />);
              }}
              containerCustomStyle={{ overflow: "visible" }}
              contentContainerCustomStyle={{ overflow: "visible" }}
            />
            <View style={styles.bckContCircle}>
              <Pagination
                dotsLength={data.photo_list.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'transparent' }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                  // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>

          </LinearGradient>
          <View style={styles.content}>
            <Text
              style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data?.title}</Text>
            <Text
              style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data.subcategory_id?.name}</Text>
            <View style={[globalStyles.row, styles.rowCont]}>
              <Text style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.textCont]}>{data.price} р</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data.count} шт</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, globalStyles.titleTextSmall]}>Время
                готовности: <Text style={styles.grayText}>{data.time_to_get_ready}</Text></Text>
            </View>
            <View style={styles.taxiContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, globalStyles.titleTextSmall]}>Стоимость доставки за 1 км: <Text style={styles.grayText}>{data.store_id.distance.$numberDecimal} р</Text></Text>
            </View>
            <View>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.ops]}>Описание</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, globalStyles.weightLight]}>{data.short_description}</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall4, globalStyles.weightLight, styles.idText]}>ID: {data.store_id._id.substring(0, 15)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnView}>
          <AppButton
            text={"Редактировать"}
            stylesContainer={styles.btnCont}
            stylesText={styles.btnText}
            onPress={() =>{
              navigation.navigate(EditGoodsName,{data})}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

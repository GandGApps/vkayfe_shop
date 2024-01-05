import { styles } from "./styles";
import React from "react";
import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import Modal from "react-native-modal";
import closeIcon from "../../../assets/images/closeIcon.png";
import wing from "../../../assets/images/wing.png";
import place from "../../../assets/images/place.png";
import search from "../../../assets/images/search.png";

import { AppInput, AppButton } from "../../../components";
import { YaMap, Marker, Suggest, Circle } from "react-native-yamap";
import { globalStyles } from "../../../constants";


export function MapModal(props) {
  console.log(props.data);
  return (
    <Modal
      visible={props.visible}
      testID={"modal"}
      style={{ padding: 0, margin: 0 }}
      backdropColor={"rgba(250, 250, 250, 0.5)"}
    >
      <View style={styles.container}>
        <YaMap
          userLocationIcon={{ uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png" }}
          initialRegion={props.location}
          showUserPosition={false}
          rotateGesturesEnabled={false}
          zoomEnabled={true}
          nightMode={false}
          mapType={"vector"}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}>
          <Marker
            point={props.location}
            scale={1.2}
            source={wing}
          />
        </YaMap>
        <View style={styles.footerCont}>
          {props.flag ?
            Object.keys(props.data).length ?
              <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
                <View style={styles.viewSearch}>
                  <Image source={place} style={styles.placeIcon} />
                  <AppInput
                    placeholder={"Введите Город"}
                    style={styles.input}
                    value={props.countryText}
                    onChangeText={(e) => props.onChangeTextFunc(e, props.setCountryText)}
                  />
                </View>
                <View style={styles.back_button_View}>
                  <TouchableOpacity onPress={() => {
                    props.setFlag(false);
                    props.setFlag1(false)
                    props.setData([]);
                    props.setCountryText("");
                  }}>
                    <Image source={closeIcon} style={styles.back_button} />
                  </TouchableOpacity>
                </View>
                {props.data.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={styles.complView} onPress={() => {
                      props.countryFunc(item, true);
                      props.setFlag1(false)
                      props.setFlag(false);
                    }}>
                      <Text
                        style={[globalStyles.titleText, styles.cameraText, globalStyles.titleTextSmall, globalStyles.weightLight, globalStyles.textAlignLeft]}>{item.GeoObject.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              :
              <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
                <View style={styles.viewSearch}>
                  <Image source={place} style={styles.placeIcon} />
                  <AppInput
                    placeholder={"Введите адрес"}
                    style={styles.input}
                    value={props.addressText}
                    onChangeText={(e) => props.onChangeTextFunc(e, props.setAddressText)}
                  />
                </View>
                <View style={styles.back_button_View}>
                  <TouchableOpacity onPress={() => {
                    props.setData1([]);
                    props.setAddressText("");
                    props.setFlag(false);
                    props.setFlag1(false)
                  }}>
                    <Image source={closeIcon} style={styles.back_button} />
                  </TouchableOpacity>
                </View>
                {props.data1.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={styles.complView} onPress={() => {
                      props.addressFunc(item, true);
                      props.setFlag(false);
                      props.setFlag1(false)
                    }}>
                      <Text
                        style={[globalStyles.titleText, styles.cameraText, globalStyles.weightBold, globalStyles.textAlignLeft]}>{item.GeoObject.description}</Text>
                      <Text
                        style={[globalStyles.titleText, styles.cameraText, globalStyles.titleTextSmall, globalStyles.weightLight, globalStyles.textAlignLeft]}>{item.GeoObject.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            :
            <>
              <View style={styles.back_button_View}>
                <TouchableOpacity onPress={() => {
                  props.modalFunc(false);
                }}>
                  <Image source={closeIcon} style={styles.back_button} />
                </TouchableOpacity>
              </View>
              <View>
                <Image source={place} style={styles.placeIcon} />
                <AppInput
                  placeholder={"Введите Город"}
                  style={styles.input}
                  value={props.countryText}
                  onChangeText={(e) => props.onChangeTextFunc(e, props.setCountryText)}
                />

              </View>
              <View>
                <Image source={place} style={styles.placeIcon} />
                <AppInput
                  placeholder={"Введите адрес"}
                  style={styles.input}
                  value={props.addressText}
                  onChangeText={(e) => props.onChangeTextFunc(e, props.setAddressText)}
                />
              </View>
              <AppButton
                text={"Найти адрес"}
                stylesContainer={styles.btn}
                onPress={() => props.finish(false)}
              />
            </>
          }
        </View>
      </View>
    </Modal>
  );
}

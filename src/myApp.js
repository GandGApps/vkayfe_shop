import React, { useEffect } from "react";
import {
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet, View,
} from "react-native";
import MainNavigator from "./navigations/MainNavigator";
import Orientation from "react-native-orientation";
import { requestCameraPermission } from "./components";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { YaMap } from 'react-native-yamap';
import { API_KEY } from "./constants";
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BaseToast, ErrorToast} from 'react-native-toast-message';


YaMap.init(API_KEY);

const MyApp = () => {

  useEffect(() => {
    Orientation.lockToPortrait();
    if(Platform.OS === 'android'){
      requestCameraPermission()
    }
  });
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: '#8179EF'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    tomatoToast: ({text1, props}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  return (
      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.KeyboardAvoidingView}
        contentContainerStyle={styles.contentContainerStyle}
        enabled={Platform.OS === "ios"}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
          <MainNavigator />
        <Toast config={toastConfig} />
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(true) + 6
  },

  KeyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "#000",
  },

});
export default MyApp;

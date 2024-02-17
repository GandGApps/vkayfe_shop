/*
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import {useSelector, useDispatch}  from "react-redux";

const ForegroundHandler = () => {
    let dispatch = useDispatch()
    let config = useSelector((store) => store.config)

    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage) => {
            const {notification,messageId} = remoteMessage
            let count = config.notificationCount + 1
            console.log(count, 'erlkfhjn');
            dispatch({
                type: "SET_CONFIG",
                payload: {notificationCount: count},
            });
            console.log(config.notificationCount, 'config.notificationCount');
            if(Platform.OS == 'ios'){
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification.body,
                    title: notification.title,
                    sound: 'default'
                });
            }else {
                PushNotification.localNotification({
                    channelId: "your-channel-id",
                    id: messageId,
                    body: 'android body',
                    title: 'android notif title',
                    soundName: 'default',
                    vibrate: true,
                    playSound: true
                })
            }
        })
        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler
*/


import React, { useEffect } from "react";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const ForegroundHandler = () => {


  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      const { notification, messageId } = remoteMessage;
      if (Platform.OS == "ios") {
        alert(JSON.stringify(remoteMessage))
        Toast.show({
          type: 'success',
          text1: notification.title,
          text2: notification.body,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: notification.title,
          text2: notification.body,
        });
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundHandler;


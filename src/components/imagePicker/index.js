import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert, PermissionsAndroid } from "react-native";


export const requestCameraPermission = async () => {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export function ChooseImage(callBack) {
  Alert.alert(
    "",
    "Добавьте фотографии из галереи или сделайте новое фото",
    [
      {
        text: "Открыть галерею", onPress: () => {
          launchImageLibrary(
            {
              mediaType: "photo",
              includeBase64: true,
              quality: 1,
            },
            (response) => {
              if (!response.didCancel) {
                callBack(response);
              }
            },
          );
        },
      },
      {
        text: "сделать фото", onPress: async () => {
          if (Platform.OS === "ios") {
            await launchCamera(
              {
                storageOptions: { privateDirectory: true },
                cropping: true,
                mediaType: "photo",
                includeBase64: true,
                quality: 1,

              },
              (response) => {
                if (!response.didCancel) {
                  callBack(response);
                }
              },
            );
          } else {
            if (await requestCameraPermission()) {
              await launchCamera(
                {
                  storageOptions: { privateDirectory: true },
                  cropping: true,
                  mediaType: "photo",
                  includeBase64: true,
                  quality: 1,

                },
                (response) => {
                  if (!response.didCancel) {
                    callBack(response);
                  }
                },
              );
            } else {
              await requestCameraPermission();
            }
          }

        },
      },
    ],
    { cancelable: true },
  );
}


export async function MultipleImage(callBack) {
  await launchImageLibrary(
    {
      selectionLimit: 5,
      mediaType: "photo",
      includeBase64: false,
      quality: 1,
    },
    (response) => {
      if (!response.didCancel) {
        callBack(response.assets);
      }
    },
  );

}

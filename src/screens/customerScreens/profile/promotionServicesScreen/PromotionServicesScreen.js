import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { View, Text, Image, ScrollView } from "react-native";
import { AppButton, BackButton } from "../../../../components";
import promotionServicesMonster from "../../../../assets/images/promotionServicesMonster.png";
import line from "../../../../assets/images/line.png";
import { globalStyles } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

export const PromotionServicesScreen = ({ navigation, route }) => {
  const store = useSelector(st => st.customer);
  const shop = store.active_store;
  const [url, setUrl] = useState("");
  const [ref, setRef] = useState(null);
  const [price, setPrice] = useState();
  const [error, setError] = useState("");
  const state = route.params.state;

  useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    try {
      const response = await axiosInstance.get("/subscribe/details");
      setPrice(response.data.amount);
    } catch (e) {
      console.log(e);
    }
  };
  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.post("/users/profile/seller/subscription", {
        value: price,
        store_id: shop._id,
      });
      setUrl(response.data.data);
    } catch (e) {
      setError(e?.response?.data?.error);
      console.log(e, "ffff");
    }
  };

  const successFunc = async () => {
    try {
      const response = await axiosInstance.post("/subscribe/change", {
        store_id: shop._id,
      });
      navigation.goBack();
    } catch (e) {
      setError(e?.response?.data?.error);
      console.log(e, "ffffdsgsdgsdgsdgsd");
    }
  };

  return (
    url ?
      <WebView
        ref={setRef} source={{ uri: url }} style={{ flex: 1 }}
        onError={event => {
          navigation.goBack();
          if (!event.nativeEvent.url.includes("success")) {
            navigation.goBack();
          }
        }}
        onLoadEnd={event => {
          if (event.nativeEvent.url.includes("success")) {
            successFunc();
          }
        }}
        containerStyle={{marginTop:25}}
      />
      :
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <BackButton navigation={navigation} />
          </View>
          <Image source={promotionServicesMonster} style={styles.pinkMonster} />
        </View>
        <View>
          <Text style={[globalStyles.titleText, globalStyles.titleTextBig, styles.titleText]}>Услуги продвижения</Text>
          <Text style={[globalStyles.titleText, globalStyles.weightLight, styles.contentText]}>
            Услуга продвижения предоставляет вам дополнительные возможности для увеличения продаж на платформе. С ее помощью вы можете вывести в ТОП 5 своих самых лучших товаров, которые будут иметь
            более высокий приоритет в результатах поиска, тем самым больший спрос у покупателей.
            Товары будут показываться рандомно совместно с участниками, кто так же приобрел услугу.
            Срок действия - 5 дней.
            Проданные товары по услуге переходят в стандартный статус.
          </Text>
          {state ?
            <Text
              style={[globalStyles.titleText, globalStyles.titleTextSmall, styles.activeTextState]}>АКТИВНА</Text>
            :
            <Text
              style={[globalStyles.titleText, globalStyles.titleTextSmall, styles.activeText]}>НЕАКТИВНА</Text>
          }
          {error ? <Text style={globalStyles.error}>{error}</Text> : null}

          <AppButton
            text={"Купить 10 продвижений"}
            stylesContainer={styles.containerBtn}
            onPress={() => {
              axiosFunc();
            }}
          />
        </View>
      </ScrollView>

  );
};

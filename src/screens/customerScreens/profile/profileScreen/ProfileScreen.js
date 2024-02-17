import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import rightIcon from "../../../../assets/images/rightIcon.png";
import bottomIcon from "../../../../assets/images/bottomIcon.png";
import shopIcon from "../../../../assets/images/shopIcon.png";
import place from "../../../../assets/images/wing.png";
import {
  BaseUrl,
  Colors,
  CreateShopName,
  FinancialReportName, globalStyles,
  MyDetailsScreenName,
  PromotionServicesName,
  ShopDataName,
  LoremName,
} from "../../../../constants";
import { ChangeShopModal, globalHeight, Loading } from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const ProfileScreen = ({ navigation }) => {
  const store = useSelector(st => st.customer);
  const shop = store.active_store;
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allShop, setAllShop] = useState([]);
  const [state, setState] = useState(false);
  const shopChangeFunc = (val) => {
    shopChangeFunc({ ...val });
  };
  useEffect(() => {
    allShopFunc();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkActiveFunc();
    });
  }, [navigation]);

  useEffect(() => {
      checkActiveFunc();
  }, [store]);

  const loadingFunc = (val) => setLoading(val);
  const modalFunc = (state) => setModalState(state);
  const navigationFunc = (nav) => {
    navigation.navigate(nav);
  };
  const createShopFunc = () => {
    navigation.navigate(CreateShopName, { state: true });
  };

  const checkActiveFunc = async () => {
    try {
      const response = await axiosInstance.get(`/users/check-sub?store_id=${shop._id}`);
      setState(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const allShopFunc = async () => {
    try {
      const response = await axiosInstance.get("/stores/my");
      setAllShop([...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[globalStyles.container,
      Platform.OS === 'ios' &&{marginTop: - (getStatusBarHeight(true) +8)}
    ]}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <ScrollView contentContainerStyle={[globalStyles.scrollContainer,
      ]} bounces={false}>
        <View style={[styles.headerContainer,
          Platform.OS === 'ios' &&{paddingTop:  (getStatusBarHeight(true) + globalHeight(30))}

        ]}>
          <View style={[styles.headerShop, globalStyles.row]}>
            <View style={globalStyles.row}>
              <Image source={{ uri: BaseUrl + "/" + shop?.logo_url }} style={styles.shopIcon} />
              <View style={styles.containerHeaderText}>
                <Text
                  style={styles.magazine}>Магазин</Text>
                <Text
                  style={styles.shopName}>{shop?.title}</Text>
                <View style={globalStyles.row}>
                  <Image source={place} style={styles.placeIcon} />
                  <Text style={styles.placeTextNew}>{shop?.city} / {shop?.address}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerRight}>
              <Text style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText, styles.idText]}>ID:
                {shop?._id?.substring(15)}</Text>
            </View>
          </View>
          <View style={styles.addShopContainer}>
            <TouchableOpacity style={styles.changeShop} onPress={() => modalFunc(true)}>
              <Text style={[globalStyles.weightLight, styles.headerFooterText]}>Выбрать другой магазин</Text>
              <Image source={bottomIcon} style={styles.bottomIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => createShopFunc()}>
              <Text style={[styles.headerFooterText, styles.changeColorStyle, globalStyles.weightLight]}>Добавить
                магазин+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={[styles.buttonContainer, styles.activeInActiveContainer]}
                            onPress={() => navigation.navigate(PromotionServicesName, { state })}>
            <View style={styles.activeContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall4, styles.activeTextHeader]}>
                Услуги продвижения:
              </Text>
              {state ?
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.activeTextState]}>АКТИВНА</Text>
                :
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.activeText]}>НЕАКТИВНА</Text>
              }
            </View>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate(ShopDataName, { shop })}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Описание магазина</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigationFunc(FinancialReportName)}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Финансовый отчет</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigationFunc(MyDetailsScreenName)}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Мои данные</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.navigate(LoremName, {
              name: "Частые вопросы",
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n" +
                "\n" +
                "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            });
          }}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Частые вопросы</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.navigate(LoremName, {
              name: "Условия предоставления услуг",
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n" +
                "\n" +
                "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            });
          }}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Условия предоставления услуг</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.navigate(LoremName, {
              name: "Политика обработки персонал...",
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n" +
                "\n" +
                "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            });
          }}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Политика обработки персонал...</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.navigate(LoremName, {
              name: "О приложении",
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n" +
                "\n" +
                "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            });
          }}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>О приложении</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
        </View>
        <ChangeShopModal
          visible={modalState}
          modalFunc={modalFunc}
          setModalState={setModalState}
          loadingFunc={loadingFunc}
          propsNavigation={navigation}
          allShop={allShop}
        />
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
};

import React, { useEffect, useState, useRef } from "react";
import { styles } from "./styles";
import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import cameraIcon from "../../../../assets/images/cameraIcon.png";
import {
  AppButton,
  AppInput,
  Loading,
  MultipleImage,
  TimeModal,
} from "../../../../components";
import { Colors, globalStyles, HomeName, HomeScreenName, SaveItemName } from "../../../../constants";
import SelectDropdown from "react-native-select-dropdown";
import axiosInstance from "../../../../networking/axiosInstance";
import { useSelector } from "react-redux";
import closeIcon from "../../../../assets/images/closeIcon.png";
import noActive from "../../../../assets/images/noActive.png";
import active from "../../../../assets/images/active.png";
import plusC from "../../../../assets/images/plusC.png";
import minusC from "../../../../assets/images/minusC.png";
import category_bottom from "../../../../assets/images/categroy_bottom.png";
import {FileHelper} from "../../../../../FilesHelper";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const AddScreen = ({ navigation, route }) => {
  const store = useSelector(st => st.customer);
  const shop = store.active_store;
  const [shopName, setShopName] = useState("");
  const [time, setTime] = useState("Всегда в наличии");//ff
  const [count, setCount] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [newImagesArray, setNewImagesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [photoColor, setPhotoColor] = useState(Colors.blue);
  const [error, setError] = useState("");
  const [timeVal, setTimeVal] = useState("");

  const timeFunc = (val) => {
    setTimeVal(val);
  };
  const modalFunc = (val) => {
    setModalState(val);
  };
  useEffect(() => {
    categoryFetch();
  }, []);


  const imagesFuncItem = (list) => {
    const arr = [];
    for (let i = 0; i < list.length; i++) {
      arr.push({
        path: item.photo_list[0],
      });
    }
    setImages([...arr]);
  };


  useEffect(() => {
    if (category) {
      setSubCategory("");
      setSubCategoryData([]);
      subCategoryFetch();
    }
  }, [category]);

  const onChangeTextFunc = (e, set) => {
    setError("");
    set(e);
  };
  const categoryFetch = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategoryData(response.data.categories);
    } catch (e) {
      console.log(e);
    }
  };
  const subCategoryFetch = async () => {
    try {

      const response = await axiosInstance.get(`/sub-categories?category_id=${category._id}`);
      setSubCategoryData(response.data.subcategories);
    } catch (e) {
      setSubCategoryData([]);
      setSubCategory("");
      console.log(e);
    }
  };
  const onPressFunc = async () => {
    if (shopName && count && shortDescription && category && Object.keys(images).length && price && (time === "Время готовности" && timeVal || time === "Всегда в наличии")) {
      await axiosFunc();
    } else if (!Object.keys(images).length) {
      setPhotoColor(Colors.red);
    } else if (!shopName) {
      setError("Укажите Название товара");
    } else if (!count) {
      setError("Укажите Количество на складе");
    } else if (!category) {
      setError("Укажите категорию");
    } else if (!price) {
      setError("Укажите Цена");
    } else if (time == "Время готовности") {
      if(!timeVal){
        setError("Укажите Время готовности ");
      }
    } else if (!shortDescription) {
      setError("Укажите Описание товара");
    }
  };
  const axiosFunc = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category_id", category._id);
      subCategory && formData.append("subcategory_id", subCategory._id);
      formData.append("title", shopName);
      formData.append("count", count);
      formData.append("time_to_get_ready", timeVal ? timeVal : time);
      formData.append("store_id", shop._id);
      formData.append("price", price);
      formData.append("short_description", shortDescription);
      for (let i = 0; i < images.length; i++) {
        formData.append(`photo_${i}`, {
          uri: images[i].uri,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
      }
      console.log(formData)
      const response = await axiosInstance.post("/goods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.replace(SaveItemName);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const imageFunc = async () => {
    try {
      await MultipleImage(async (imageRes) => {
        if (Object.keys(images).length) {
          setImages([...imageRes, ...images]);
        } else {
          setPhotoColor(Colors.blue);
          setImages([...imageRes]);
        }
      });
    } catch (err) {
    }
  };
  const addNumFunc = () => {
    setCount(`${+count + 1}`);
  };
  const minNumFunc = () => {
    if (count !== `${0}`) {
      setCount(`${+count - 1}`);
    }
  };

  const deleteFunc = (val, state) => {
    const arr = images.filter(item => item.uri !== val);
    setImages([...arr]);
  };

  return (
    <View style={[globalStyles.container,
      Platform.OS === 'ios' &&{marginTop: - (getStatusBarHeight(true) +8)}

    ]}>
      <ScrollView contentContainerStyle={[globalStyles.scrollContainer,
      ]} bounces={false}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
        <View style={[styles.headerContainer,        Platform.OS === 'ios' &&{paddingTop:  (getStatusBarHeight(true) +8)}
        ]}>
          <Text style={styles.addText}>Добавить товар</Text>
          <View style={styles.cameraContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contScroll}>
                <View>
                  <TouchableOpacity style={[styles.AddPhotoContainer, { borderColor: photoColor }]}
                                    onPress={() => {
                                      FileHelper.pickFile(5,false,true,false)
                                        .then(res => {
                                          if (Object.keys(images).length) {
                                            setImages([...res, ...images]);
                                          } else {
                                            setPhotoColor(Colors.blue);
                                            setImages([...res]);
                                          }                                        })
                                        .catch(e => {
                                          console.log(e, 'eee');
                                        })
                                      // imageFunc()
                                    }
                                    }>
                    <Image source={cameraIcon} style={styles.iconCameraStyle} />
                  </TouchableOpacity>
                </View>
                {images.map((item, index) => {
                  return (
                    <View key={index} style={styles.imgCont}>

                      <TouchableOpacity style={styles.closeCont} onPress={() => {
                        deleteFunc(item.uri);
                      }}>
                        <Image source={closeIcon} style={styles.closeIcon} />
                      </TouchableOpacity>
                      <Image key={index} source={{ uri: item.uri }}
                             style={styles.photosContainer} />
                    </View>
                  );
                })}
              </ScrollView>
            <Text
              style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.weightLight, styles.loadingText, { color: photoColor }]}>Загрузите
              фотографии товара</Text>
          </View>

        </View>
        <View style={styles.content}>
          <AppInput
            placeholder={"Название товара"}
            style={styles.inputContainer}
            onChangeText={(e) => onChangeTextFunc(e, setShopName)}
            value={shopName}
          />
          <View style={styles.inputContainer}>
            <View>
              <TouchableOpacity style={[globalStyles.row, styles.activeContainer]}
                                onPress={() => {
                                  setTime("Всегда в наличии");
                                  timeFunc("");
                                }}>
                <Image source={time === "Всегда в наличии" ? active : noActive} style={styles.imgAct} />
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Всегда в
                  наличии</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.row, styles.activeContainer]}
                                onPress={() => setTime("Время готовности")}>
                <Image source={time === "Время готовности" ? active : noActive} style={styles.imgAct} />
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Время
                  готовности</Text>
              </TouchableOpacity>
              {time === "Время готовности" ?
                <TouchableOpacity onPress={() => modalFunc(true)} style={styles.vremyaStyle}>
                  <Text
                    style={[globalStyles.weightLight, globalStyles.titleTextSmall, styles.input]}>{timeVal ? timeVal : time}</Text>
                </TouchableOpacity>
                : null}
            </View>
          </View>
          <View>
            <TouchableOpacity style={[styles.btnAdd, styles.abslleft]} onPress={minNumFunc}>
              <Image source={minusC} style={styles.imgPlusMinus}/>
            </TouchableOpacity>
            <AppInput
              placeholder={"Количество на складе"}
              style={styles.addCont}
              value={count}
              keyboardType={"numeric"}
              onChangeText={(e) => onChangeTextFunc(e, setCount)}
            />
            <TouchableOpacity style={[styles.btnAdd, styles.absl]} onPress={addNumFunc}>
                <Image source={plusC} style={styles.imgPlusMinus}/>
              </TouchableOpacity>
          </View>
          <AppInput
            placeholder={"Цена"}
            style={styles.inputContainer}
            keyboardType={"numeric"}
            onChangeText={(e) => onChangeTextFunc(e, setPrice)}
            value={price}
          />
          <View style={styles.dropCont}>
            <View style={styles.opacityView}>
            <SelectDropdown
              data={categoryData}
              buttonStyle={styles.btnStyleDrop}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={"категория"}
              rowTextStyle={styles.choosePhotoText}
              onSelect={(selectedItem) => {
                 setError("");
                 setSubCategory('')
                setSubCategoryData([])
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem.title;
              }} />

            </View>
            <View style={styles.catCont}>
              <Text style={[globalStyles.weightLight,globalStyles.titleTextSmall,styles.textCat]}>{category?.title ? category.title : 'Категория'}</Text>
              <Image source={category_bottom} style={styles.category_bottom}/>
            </View>
          </View>
          {Object.keys(subCategoryData).length ? (
            <View style={styles.dropCont}>
              <View style={styles.opacityView}>
              <SelectDropdown
                data={subCategoryData}
                buttonStyle={styles.btnStyleDrop}
                dropdownStyle={styles.categoryInput}
                defaultButtonText={"Подкатегория"}
                rowTextStyle={styles.choosePhotoText}
                onSelect={(selectedItem) => {
                  setSubCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(selectedItem) => {
                  return selectedItem.name;
                }} />
              </View>
              <View style={styles.catCont}>
                <Text style={[globalStyles.weightLight,globalStyles.titleTextSmall,styles.textCat]}>{subCategory?.name ? subCategory.name : 'Подкатегория'}</Text>
                <Image source={category_bottom} style={styles.category_bottom}/>
              </View>
            </View>
          ) : null}
          <Text
            style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.textAlignLeft, styles.titleInp]}>Описание
            товара</Text>
          <AppInput
            style={styles.inputBig}
            onChangeText={(e) => onChangeTextFunc(e, setShortDescription)}
            editable
            numberOfLines={5}
            multiline
            value={shortDescription}
          />
          {error ? <Text style={globalStyles.error}>{error}</Text> : null}
          <AppButton
            text={"Опубликовать"}
            stylesContainer={styles.btnStyle}
            onPress={onPressFunc}
          />
        </View>
      </ScrollView>
      <TimeModal
        modalFunc={modalFunc}
        visible={modalState}
        timeFunc={timeFunc}
      />
      <Loading loading={loading} />
    </View>
  );
};

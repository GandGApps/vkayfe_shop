import React, { useState } from "react";
import { styles } from "./styles";
import {  ScrollView, Text,  View } from "react-native";
import { AppButton, BackButton, FilterData, FilterForm, SaveProfileData, WaitingForm } from "../../../../components";

import { Colors, FinancialReportDataName, FinancialReportName, globalStyles } from "../../../../constants";
import SelectDropdown from "react-native-select-dropdown";

export const FinancialFilterScreen = ({ navigation, route }) => {
  const [dropDownstate, setDropDownstate] = useState("");
  const [dataCategories, setDataCategories] = useState([
    { name: "Сначала большая оплата", id: 1, type: 'big' },
    { name: "Сначала меньшая оплата", id: 2, type: 'small' },
  ]);
  const [chooseSort , setChooseSort] = useState({
    id: 1,
    name: "Весь период",
    check: true,
    key: "stock",
  },)
  const [chooseDataCategories , setChooseDataCategories] = useState( { name: "Сначала большая оплата", id: 1 },)
  const [sort, setSort] = useState([
    {
      id: 1,
      name: "Весь период",
      check: true,
      key: "all",
    },
    {
      id: 2,
      name: "За сегодня",
      check: false,
      key: 1,
    },
    {
      id: 3,
      name: "За неделю",
      check: false,
      key: 7,
    },
    {
      id: 4,
      name: "за месяц",
      check: false,
      key: 30,
    },
    {
      id: 5,
      name: "за квартал",
      check: false,
      key: 90,
    },
    {
      id: 6,
      name: "за полгода",
      check: false,
      key: 182,
    },
    {
      id: 7,
      name: "за год",
      check: false,
      key: 364,
    },
  ]);

  let checkFilterSort = (index) => {
    for (let i = 0; i < sort.length; i++) {
      sort[i].check = false;
    }
    sort[index].check = true;
    setChooseSort({...sort[index]})
    setSort([...sort]);
  };
  const deleteFilterFunc = () =>{
    navigation.navigate(FinancialReportName)
  }

  return (
    <View style={styles.container}>
      <View>
        <BackButton
          text={"Фильтры"}
          deleteAll={deleteFilterFunc}
          navigation={navigation}

          stylesBack={styles.backContainer}
        />
        <View style={styles.containerCategory}>
          <Text style={[styles.titleCategory,globalStyles.titleText,globalStyles.textAlignLeft,styles.titleCategory,globalStyles.weightBold,globalStyles.titleTextSmall]}>Сортировка</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {sort.map((item, index) => {
              return (
                <FilterForm
                  item={item}
                  index={index}
                  check={checkFilterSort}
                  key={index}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.containerCategory}>
          <Text style={[styles.titleCategory,globalStyles.titleText,globalStyles.textAlignLeft,styles.titleCategory,globalStyles.weightBold,globalStyles.titleTextSmall]}>По цене</Text>
          <View style={styles.dropCont}>
            <SelectDropdown
              data={dataCategories}
              buttonStyle={styles.btnStyleDrop}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={"Сначала большая оплата"}
              rowTextStyle={styles.choosePhotoText}
              onSelect={(selectedItem) => {
                setChooseDataCategories({ ...selectedItem });
                setDropDownstate(selectedItem.name);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem.name;
              }} />
          </View>
        </View>
      </View>
      <View style={styles.appButtonContainer}>
        <AppButton
          text={"Применить"}
          onPress={() => {
            route.params.onChangeFilter(chooseSort, chooseDataCategories)
            navigation.navigate(FinancialReportName)
          }}
        />
      </View>
    </View>
  );
};

import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from "react-native";
import { BackButton, CategoryData, FinancialData_, FinancialForm, FormCategory } from "../../../../components";
import { Colors, FilterName, FinancialFilterName, globalStyles } from "../../../../constants";
import FilterIcon from "../../../../assets/images/filter.png";
import axiosInstance from "../../../../networking/axiosInstance";
import moment from 'moment'

export const FinancialReportScreen = ({ navigation }) => {
  const [finances, setFinances] = useState([]);
  const [financesData, setFinancesData] = useState([]);
  const [allPrice,setAllPrice] = useState(0)
  const [filter, setFilter] = useState({
    date: 'all',
    price: 'big'
  })
  let onChangeFilter = (item, price) => {
    if(price.type === 'small'){
      financesData.sort((a, b) =>a.price - b.price )
    }else{
      financesData.sort((a, b) =>b.price - a.price )
    }
    if(item.key === 'all'){
      return setFinances([...financesData])
    }
    setFilter({...{item, price}})
    let arr = []
    for (let i = 0; i< financesData.length; i++){
      let date  = moment(financesData[i].delivery_date, "DDMMYYYY");
      let date_now = moment(new Date(), "DDMMYYYY");
      let duration = date_now.diff(date, "days") ;
      if(duration < item.key){
        arr.push(financesData[i])
      }
    }
    setFinances([...arr])
  }
  const navigationFunc = (name) => {
    navigation.navigate(name);
  };

  useEffect(() => {
    axiosFunc();
  }, []);

  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.get("/finances");
      setFinances(response.data);
      setFinancesData(response.data);
      let a = 0
      for(let i = 0; i < response.data.length;i++){
        a = a + +response.data[i].income
      }
      setAllPrice(a)
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <View style={styles.headerContainer}>
        <BackButton
          navigation={navigation}
          text={"Финансовый отчет"}
        />
        <View style={[styles.headerContent]}>
          <TouchableOpacity style={styles.filterContainer} onPress={() => navigation.navigate(FinancialFilterName, {onChangeFilter: onChangeFilter})}>
            <Text style={[styles.filterTextStyle, globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall]}>Фильтры</Text>
            <Image source={FilterIcon} style={styles.filterIconStyle} />
          </TouchableOpacity>
          <Text style={globalStyles.titleText}>Сумма: {allPrice} р</Text>
        </View>
      </View>
      <FlatList data={finances} renderItem={({ item, index }) => {
        return (
          <FinancialForm
            item={item}
            key={index}
            navigation={navigation}

          />
        );
      }} />
    </View>
  );
};

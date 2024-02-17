import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import { FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  CategoryData,
  FormCategory,
  BackButton,
  chooseData,
  WaitingForm,
  AddTrushData,
  globalHeight,
} from "../../../../components";
import {AddName, AddScreenName, globalStyles, HomeScreenName, SignInName} from "../../../../constants";


export const LoremScreen = ({navigation, route}) => {

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer} bounces={false}>
            <BackButton
            navigation={navigation}
            text={route.params.name}
            textStyle
            stylesBack={{    paddingTop:Platform.OS === 'ios' ? globalHeight(25) : 0
            }}
            />
        <Text style={[globalStyles.titleText, globalStyles.weightLight,styles.text]}>{route.params.text}</Text>
        </ScrollView>
    )
};

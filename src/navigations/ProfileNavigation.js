import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CreateShopName,
  DeleteShopName,
  EditMyDetailsName,
  FinancialFilterName,
  FinancialReportDataName,
  FinancialReportName,
  MyDetailsScreenName,
  ProfileScreenName,
  PromotionServicesName,
  SaveEditProfileName,
  ShopDataName, WaitingName,LoremName
} from "../constants";
import {
  CreateShopScreen,
  DeleteShopScreen,
  EditMyDetailsScreen,
  FinancialFilterScreen,
  FinancialReportDataScreen,
  FinancialReportScreen,
  MyDetailsScreen,
  ProfileScreen,
  PromotionServicesScreen,
  SaveEditProfileScreen,
  ShopDataScreen, WaitingScreen,LoremScreen
} from "../screens";

const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ProfileScreenName} component={ProfileScreen} />
      <Stack.Screen name={MyDetailsScreenName} component={MyDetailsScreen} />
      <Stack.Screen name={ShopDataName} component={ShopDataScreen} />
      <Stack.Screen name={EditMyDetailsName} component={EditMyDetailsScreen} />
      <Stack.Screen name={SaveEditProfileName} component={SaveEditProfileScreen} />
      <Stack.Screen name={FinancialReportName} component={FinancialReportScreen} />
      <Stack.Screen name={FinancialReportDataName} component={FinancialReportDataScreen} />
      <Stack.Screen name={PromotionServicesName} component={PromotionServicesScreen} />
      <Stack.Screen name={DeleteShopName} component={DeleteShopScreen} />
      <Stack.Screen name={FinancialFilterName} component={FinancialFilterScreen} />
      <Stack.Screen name={CreateShopName} component={CreateShopScreen} />
      <Stack.Screen name={WaitingName} component={WaitingScreen} />
      <Stack.Screen name={LoremName} component={LoremScreen}/>
    </Stack.Navigator>
  );
}

export default ProfileNavigation;

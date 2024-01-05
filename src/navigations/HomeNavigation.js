import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AddName,
  AddScreenName,
  CategoryName,
  EditGoodsName,
  FilterName,
  GoodsDataName,
  GoodsImgName,
  HomeScreenName,
  SubCategoryName,
} from "../constants";
import {
  AddScreen,
  CategoryScreen,
  EditGoodsScreen,
  FilterScreen,
  GoodsDataScreen,
  GoodsImgScreen,
  HomeScreen,
  SubCategoryScreen,
} from "../screens";

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={HomeScreenName} component={HomeScreen} />
      <Stack.Screen name={FilterName} component={FilterScreen} />
      <Stack.Screen name={CategoryName} component={CategoryScreen} />
      <Stack.Screen name={SubCategoryName} component={SubCategoryScreen} />
      <Stack.Screen name={GoodsDataName} component={GoodsDataScreen} />
      <Stack.Screen name={GoodsImgName} component={GoodsImgScreen} />
      <Stack.Screen name={AddScreenName} component={AddScreen} />
      <Stack.Screen name={EditGoodsName} component={EditGoodsScreen} />

    </Stack.Navigator>
  );
}

export default HomeNavigation;

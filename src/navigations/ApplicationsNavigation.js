import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationsDataName, ApplicationsScreenName, MessagesName } from "../constants";
import { AplicationsScreen, ApplicationsDataScreen, MessagesScreen } from "../screens";


const Stack = createStackNavigator();

function ApplicationsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ApplicationsScreenName} component={AplicationsScreen} />
      <Stack.Screen name={ApplicationsDataName} component={ApplicationsDataScreen} />
      <Stack.Screen name={MessagesName} component={MessagesScreen} />

    </Stack.Navigator>
  );
}

export default ApplicationsNavigation;

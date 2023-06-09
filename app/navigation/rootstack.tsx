import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StripeCardForm from "../components/stripe";

const Stack = createStackNavigator();

const RootStack = () => 
{
  return (
    <React.Fragment>
		  <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="startup" >
			  <Stack.Screen name="startup" component={StripeCardForm} />
		  </Stack.Navigator>
    </React.Fragment>
  );
}

export default RootStack;


import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { selectors } from "store";
import { ProductsNavigator } from "navigation/ShopNavigator";

const NavigationWrapper = props => {
  const isAuth = useSelector(selectors.isAuth);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;

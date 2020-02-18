import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { selectors } from "store";
import { ShopNavigator, AuthNavigator } from "navigation/ShopNavigator";
import { StartupScreen } from "screens";

const NavigationWrapper = props => {
  const isAuth = useSelector(selectors.isAuth);
  const triedLogin = useSelector(selectors.getTriedAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && triedLogin && <AuthNavigator />}
      {!isAuth && !triedLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default NavigationWrapper;

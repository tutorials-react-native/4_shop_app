import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";
import { selectors } from "store";

const NavigationWrapper = props => {
  const nav = useRef();
  const isAuth = useSelector(selectors.isAuth);
  console.log("isAuth", isAuth);
  useEffect(() => {
    if (!isAuth) {
      nav.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
    }
  }, [isAuth]);
  return <ShopNavigator ref={nav} />;
};

export default NavigationWrapper;

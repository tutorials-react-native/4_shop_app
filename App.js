import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import store from "store/configureStore";
import { ShopNavigator } from "navigation";

const fetchData = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fetchData} onFinish={() => setDataLoaded(true)} />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import Colors from "colors";
import { actions } from "store";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const autoLogin = async () => {
      const authData = await AsyncStorage.getItem("authData");
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        const { token, userId, expireDate } = parsedAuthData;

        if (new Date(expireDate) <= new Date() || !token || !userId) {
          navigation.navigate("Auth");
        }

        dispatch(actions.authenticate(token, userId));
        navigation.navigate("Shop");
      } else {
        navigation.navigate("Auth");
      }
    };

    autoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartupScreen;

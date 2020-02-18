import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import produce from "immer";
import { useDispatch } from "react-redux";

import { Input } from "components/shop";
import { Card } from "components/UI";
import Colors from "colors";
import { actions } from "store";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = produce((draft, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const { value, isValid, input } = action;
      draft.inputValues[input] = value;
      draft.inputValidates[input] = isValid;
      draft.formIsValid = Object.values(draft.inputValidates).reduce(
        (FormValid, inputValid) => FormValid && inputValid
      );
      return;
  }
  return;
});

const AuthScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidates: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert(`${isSignUp ? "Sign Up" : "Login"} Failed`, error.message, [
        { text: "Okay" }
      ]);
    }
  }, [error]);

  const inputTextChangeHandler = useCallback((id, value, isValid) => {
    dispatchFormState({ type: FORM_INPUT_UPDATE, value, isValid, input: id });
  });

  const authHandler = async () => {
    const { password, email } = formState.inputValues;
    setError(null);
    setIsLoading(true);
    try {
      if (isSignUp) {
        await dispatch(actions.signUp(email, password));
      } else {
        await dispatch(actions.login(email, password));
      }
      // navigation.navigate({ routeName: "Shop" });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              errorMessage="Pleas enter valid email."
              initialValue=""
              initialValidate={false}
              onInputTextChange={inputTextChangeHandler}
              keyboardType="default"
              required
              autoCapitalize="none"
              email
            />
            <Input
              id="password"
              label="Password"
              errorMessage="Pleas enter valid password."
              secureTextEntry
              initialValue=""
              initialValidate={false}
              onInputTextChange={inputTextChangeHandler}
              keyboardType="default"
              required
              autoCapitalize="none"
              minLength={5}
            />
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <View style={styles.buttonContainer}>
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  onPress={authHandler}
                  color={Colors.primary}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
                color={Colors.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.screenOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 10
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;

import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import produce from "immer";

const Input = props => {
  const {
    id,
    label,
    errorMessage,
    initialValue,
    initialValidate,
    onInputTextChange
  } = props;

  const INPUT_UPDATE = "INPUT_UPDATE";
  const LOST_FOCUS = "LOST_FOCUS";
  const inputReducer = produce((draft, action) => {
    switch (action.type) {
      case INPUT_UPDATE:
        const { value, isValid } = action;
        draft.value = value;
        draft.isValid = isValid;
        return;
      case LOST_FOCUS:
        draft.touched = true;
        return;
    }
    return;
  });
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initialValidate ? initialValidate : "",
    touched: false
  });

  useEffect(() => {
    onInputTextChange(id, inputState.value, inputState.isValid);
  }, [id, inputState, onInputTextChange]);

  const textChangeHandler = text => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchInputState({
      type: INPUT_UPDATE,
      value: text,
      isValid
    });
  };

  const lostFocusHandler = () => {
    dispatchInputState({
      type: LOST_FOCUS
    });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        autoCapitalize="sentences"
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    justifyContent: "center",
    marginVertical: 20
  },
  label: {
    fontSize: 16,
    fontFamily: "open-sans-bold"
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
    fontFamily: "open-sans"
  },
  errorContainer: { marginVertical: 5 },
  errorText: { color: "red", fontFamily: "open-sans", fontSize: 13 }
});

export default Input;

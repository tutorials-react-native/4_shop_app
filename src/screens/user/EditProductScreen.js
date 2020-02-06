import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import produce from "immer";

import { CustomHeaderButton, Card } from "components/UI";
import { Input } from "components/shop";
import { selectors, actions } from "store";

const EditProductScreen = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const editedProduct = useSelector(selectors.getUserProductById(productId));
  const dispatch = useDispatch();

  const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
  const formReduer = produce((draft, action) => {
    switch (action.type) {
      case FORM_INPUT_UPDATE:
        const { value, isValid, input } = action;
        draft.inputValues[input] = value;
        draft.inputValidates[input] = isValid;
        draft.formIsValid = Object.values(draft.inputValidates).reduce(
          (FormValid, inputValid) => FormValid && inputValid
        );
        break;
    }
    return;
  });

  const [formState, dispatchFormState] = useReducer(formReduer, {
    inputValues: {
      title: productId ? editedProduct.title : "",
      image: productId ? editedProduct.imageUrl : "",
      description: productId ? editedProduct.description : "",
      price: ""
    },
    inputValidates: {
      title: productId ? true : false,
      image: productId ? true : false,
      description: productId ? true : false,
      price: productId ? true : false
    },
    formIsValid: false
  });

  const { title, image, description, price } = formState.inputValues;
  const { inputValidates, formIsValid } = formState;

  const inputTextChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({ type: FORM_INPUT_UPDATE, value, isValid, input: id });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    if (!formIsValid) {
      Alert.alert("Wrong input", "Check your input fields", [{ text: "Okay" }]);
    } else {
      if (productId) {
        dispatch(
          actions.updateProduct({
            id: productId,
            ownerId: "u1",
            title,
            imageUrl: image,
            description
          })
        );
      } else {
        dispatch(
          actions.createProduct({
            id: new Date().toString(),
            ownerId: "u1",
            title,
            imageUrl: image,
            description,
            price: +price
          })
        );
      }
      navigation.goBack();
    }
  }, [productId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <Card style={styles.screen}>
        <ScrollView>
          <Input
            id="title"
            label="Title"
            errorMessage="Title is wrong!"
            initialValue={title}
            initialValidate={inputValidates.title}
            onInputTextChange={inputTextChangeHandler}
          />
          <Input
            id="image"
            label="Image Url"
            errorMessage="Image url is wrong!"
            initialValue={image}
            initialValidate={inputValidates.image}
            onInputTextChange={inputTextChangeHandler}
          />
          <Input
            id="description"
            label="Description"
            errorMessage="Description is wrong!"
            initialValue={description}
            initialValidate={inputValidates.description}
            onInputTextChange={inputTextChangeHandler}
            multiline
          />
          {!productId && (
            <Input
              id="price"
              label="Price"
              errorMessage="Price is wrong!"
              initialValue={price}
              initialValidate={inputValidates.price}
              onInputTextChange={inputTextChangeHandler}
            />
          )}
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam("submit");
  return {
    headerTitle: navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="save"
          iconName={Platform.Os === "ios" ? "ios-checkmark" : "md-checkmark"}
          onPress={submitHandler}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    flex: 1,

    padding: 20
  }
});

export default EditProductScreen;

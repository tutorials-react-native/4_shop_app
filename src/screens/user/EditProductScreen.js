import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  View,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import produce from "immer";

import { CustomHeaderButton, Card } from "components/UI";
import { Input } from "components/shop";
import { selectors, actions } from "store";
import Colors from "colors";

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
      break;
  }
  return;
});

const EditProductScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = navigation.getParam("productId");
  const editedProduct = useSelector(selectors.getUserProductById(productId));
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
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
    formIsValid: productId ? true : false
  });

  const { title, image, description, price } = formState.inputValues;
  const { inputValidates, formIsValid } = formState;

  useEffect(() => {
    if (error) {
      Alert.alert("Warning", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formIsValid) {
      Alert.alert("Wrong input", "Check your input fields", [{ text: "Okay" }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (productId) {
        await dispatch(
          actions.updateProduct({
            id: productId,
            ownerId: "u1",
            title,
            imageUrl: image,
            description
          })
        );
      } else {
        await dispatch(
          actions.createProduct({
            ownerId: "u1",
            title,
            imageUrl: image,
            description,
            price: +price
          })
        );
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, title, image, description, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputTextChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({ type: FORM_INPUT_UPDATE, value, isValid, input: id });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValidate={inputValidates.title}
            onInputTextChange={inputTextChangeHandler}
          />
          <Input
            id="image"
            label="Image Url"
            errorMessage="Image url is wrong!"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initialValidate={inputValidates.image}
            onInputTextChange={inputTextChangeHandler}
          />
          <Input
            id="description"
            label="Description"
            errorMessage="Description is wrong!"
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValidate={inputValidates.description}
            onInputTextChange={inputTextChangeHandler}
            multiline
          />
          {!productId && (
            <Input
              id="price"
              label="Price"
              errorMessage="Price is wrong!"
              initialValue={editedProduct ? editedProduct.price : ""}
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProductScreen;

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "components/UI";
import { selectors, actions } from "store";

const EditProductScreen = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const editedProduct = useSelector(selectors.getUserProductById(productId));
  const dispatch = useDispatch();

  const [title, setTitle] = useState(productId ? editedProduct.title : "");
  const [image, setImage] = useState(productId ? editedProduct.imageUrl : "");
  const [description, setDescription] = useState(
    productId ? editedProduct.description : ""
  );
  const [price, setPrice] = useState(
    productId ? editedProduct.price.toString() : ""
  );

  const submitHandler = useCallback(() => {
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
  }, [productId, title, image, description, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <View style={styles.screen}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      {!productId && (
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
        </View>
      )}
    </View>
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

    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 8,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    padding: 20
  },
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
  }
});

export default EditProductScreen;

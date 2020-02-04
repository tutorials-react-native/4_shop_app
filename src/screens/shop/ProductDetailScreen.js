import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "colors";
import { actions } from "store";

const ProductDetailScreen = ({ navigation }) => {
  const selectedProduct = navigation.getParam("selectedProduct");
  const { imageUrl, price, description } = selectedProduct;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(actions.addToCart(selectedProduct));
  };
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={addToCartHandler}
        />
      </View>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const selectedProduct = navigation.getParam("selectedProduct");
  return { headerTitle: selectedProduct.title };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  price: {
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans"
  }
});

export default ProductDetailScreen;

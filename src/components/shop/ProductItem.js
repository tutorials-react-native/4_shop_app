import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

import { TouchableCmp } from "components";
import { Card } from "components/UI";

const ProductItem = ({ itemData, onSelect, onLongSelect, children }) => {
  const selectedItem = itemData.item;
  const { title, imageUrl, price } = selectedItem;
  return (
    <Card style={styles.product}>
      <TouchableCmp
        onPress={() => onSelect && onSelect(selectedItem)}
        onLongPress={() => onLongSelect && onLongSelect(selectedItem)}
      >
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },

  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  detail: {
    alignItems: "center",
    justifyContent: "space-around",
    height: "15%"
  },
  title: {
    fontSize: 15,
    fontFamily: "open-sans-bold"
  },
  price: {
    color: "#888",
    fontFamily: "open-sans"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
});

export default ProductItem;

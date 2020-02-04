import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { selectors } from "store";
import Colors from "colors";
import { CartItem } from "components/shop";

const CartScreen = () => {
  const cartItems = useSelector(selectors.getCartItems);
  const totalAmount = useSelector(selectors.getCartTotalAmount);

  const cartItemsArray = Object.keys(cartItems).map(key => {
    const item = cartItems[key];
    return {
      key,
      ...item
    };
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.totalText}>
          Total: <Text style={styles.totalAmount}>${totalAmount}</Text>
        </Text>

        <Button title="Order Now" />
      </View>
      <FlatList data={cartItemsArray} renderItem={CartItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20
  },
  totalText: {
    fontSize: 18,
    fontFamily: "open-sans-bold"
  },
  totalAmount: {
    fontFamily: "open-sans",
    color: Colors.primary
  }
});

export default CartScreen;

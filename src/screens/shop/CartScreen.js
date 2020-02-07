import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { selectors } from "store";
import Colors from "colors";
import { CartItem } from "components/shop";
import { Card } from "components/UI";
import { actions } from "store";

const CartScreen = () => {
  const cartItems = useSelector(selectors.getCartItems);
  const totalAmount = useSelector(selectors.getCartTotalAmount);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cartItemsArray = Object.keys(cartItems).map(key => {
    const item = cartItems[key];
    return {
      key,
      ...item
    };
  });

  const removeHandler = cartItem => {
    dispatch(actions.removeFromCart(cartItem));
  };

  const orderHandler = async () => {
    setIsLoading(true);
    await dispatch(actions.addOrder(cartItemsArray, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.totalText}>
          Total:{" "}
          <Text style={styles.totalAmount}>
            ${Math.abs(totalAmount.toFixed(2))}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            disabled={totalAmount === 0}
            onPress={orderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItemsArray}
        renderItem={itemData => (
          <CartItem cartItem={itemData.item} onRemove={removeHandler} />
        )}
      />
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

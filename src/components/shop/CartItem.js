import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = itemData => {
  const { quantity, sum, productPrice, productTitle } = itemData.item;
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{productTitle}</Text>
      <View style={styles.multiplyContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.mulityply}>x</Text>
        <Text style={styles.price}>{productPrice}</Text>
      </View>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
      <TouchableOpacity>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
          size={18}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  multiplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  quantity: {
    color: "#888"
  },
  price: {
    color: "#888"
  },
  sum: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  }
});

export default CartItem;

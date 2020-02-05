import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Colors from "colors";
import CartItem from "components/shop/CartItem";

const OrderItem = ({ itemData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { items, totalAmount, readableDate } = itemData.item;
  return (
    <View style={styles.orders}>
      <View style={styles.summary}>
        <Text style={styles.amount}>Total: ${totalAmount}</Text>
        <Text style={styles.date}>{readableDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && (
        <View style={styles.details}>
          {items.map(item => (
            <CartItem key={item.key} cartItem={item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orders: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 51,
    borderRadius: 10,
    margin: 20,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    color: "#888",
    fontSize: 16,
    fontFamily: "open-sans"
  },
  details: {
    width: "100%"
  }
});

export default OrderItem;

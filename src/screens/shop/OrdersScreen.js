import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectors, actions } from "store";
import { CustomHeaderButton } from "components/UI";
import { OrderItem } from "components/shop";
import Colors from "colors";

const OrdersScreen = () => {
  const orders = useSelector(selectors.getOrders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = async () => {
    setIsLoading(true);
    await dispatch(actions.fetchOrders());
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={itemData => <OrderItem itemData={itemData} />}
    />
  );
};

OrdersScreen.screenOptions = ({ navigation }) => ({
  headerTitle: "Your Orders",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  centerd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OrdersScreen;

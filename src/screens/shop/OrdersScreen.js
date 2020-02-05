import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectors } from "store";
import { CustomHeaderButton } from "components/UI";
import { OrderItem } from "components/shop";

const OrdersScreen = () => {
  const orders = useSelector(selectors.getOrders);
  return (
    <FlatList
      data={orders}
      renderItem={itemData => <OrderItem itemData={itemData} />}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => ({
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

export default OrdersScreen;

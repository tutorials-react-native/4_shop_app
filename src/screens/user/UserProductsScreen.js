import React from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectors, actions } from "store";
import { ProductItem } from "components/shop";
import { CustomHeaderButton } from "components/UI";
import Colors from "colors";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(selectors.getUserProducts);
  const dispatch = useDispatch();

  const deleteHandler = productId => {
    Alert.alert("Delete item", "Are you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(actions.deleteProduct(productId));
        }
      }
    ]);
  };

  const editHandler = productId => {
    navigation.navigate({ routeName: "EditProduct", params: { productId } });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={itemData => (
        <ProductItem
          itemData={itemData}
          onLongSelect={() => editHandler(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Your Products",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="create"
        iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
        onPress={() => navigation.navigate("EditProduct")}
      />
    </HeaderButtons>
  )
});
export default UserProductsScreen;

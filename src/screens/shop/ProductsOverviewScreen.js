import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectors, actions } from "store";
import { ProductItem } from "components/shop";
import { CustomHeaderButton } from "components/UI";
import Colors from "color";

const ProductsOverviewScreen = ({ navigation }) => {
  const availableProducts = useSelector(selectors.getAvailableProducts);
  const dispatch = useDispatch();

  const detailViewHandler = selectedProduct => {
    navigation.navigate({
      routeName: "ProductDetail",
      params: {
        selectedProduct
      }
    });
  };

  const AddToCartHandler = selectedProduct => {
    dispatch(actions.addToCart(selectedProduct));
  };

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem itemData={itemData} onSelect={detailViewHandler}>
          <Button
            color={Colors.primary}
            title="Detail View"
            onPress={() => {
              detailViewHandler(itemData.item);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => AddToCartHandler(itemData.item)}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Products",
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
        title="cart"
        iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        onPress={() => navigation.navigate("Cart")}
      />
    </HeaderButtons>
  )
});

export default ProductsOverviewScreen;

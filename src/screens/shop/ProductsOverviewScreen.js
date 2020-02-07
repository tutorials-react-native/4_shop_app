import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList,
  ActivityIndicator
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    await dispatch(actions.fetchProduct()).catch(error => {
      console.log(error);
      setError(error);
    });
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    const focusListener = navigation.addListener("willFocus", loadProducts);
    return () => focusListener.remove();
  });

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products. Start adding it!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>error occured!</Text>
        <Button title="Try again" onPress={loadProducts} />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;

import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
  UserProductsScreen,
  EditProductScreen,
  AuthScreen
} from "screens";
import Colors from "colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    }
  }
);

const OrdersNavigator = createStackNavigator(
  {
    OrderList: OrdersScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-list" : "md-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    }
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-checkbox" : "md-checkbox"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    }
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Product: ProductsNavigator,
    Orders: OrdersNavigator,
    UserProducts: UserProductsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const AuthStackNavigator = createStackNavigator(
  {
    LogIn: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthStackNavigator
});

export default createAppContainer(MainNavigator);

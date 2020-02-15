import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform, View, Button, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
  UserProductsScreen,
  EditProductScreen,
  AuthScreen,
  StartupScreen
} from "screens";
import { screenOptions } from "screens/shop/ProductsOverviewScreen";
import Colors from "colors";
import { actions } from "store";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductsStacknavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStacknavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStacknavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={screenOptions}
      />
      <ProductsStacknavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsStacknavigator.Screen name="Cart" component={CartScreen} />
    </ProductsStacknavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     }
//   }
// );

// const OrdersNavigator = createStackNavigator(
//   {
//     OrderList: OrdersScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "ios" ? "ios-list" : "md-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     }
//   }
// );

// const UserProductsNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "ios" ? "ios-checkbox" : "md-checkbox"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     }
//   }
// );

// const ShopNavigator = createDrawerNavigator(
//   {
//     Product: ProductsNavigator,
//     Orders: OrdersNavigator,
//     UserProducts: UserProductsNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="LOG OUT"
//               onPress={() => {
//                 dispatch(actions.logOut());
//                 props.navigation.navigate("Auth");
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

// const AuthStackNavigator = createStackNavigator(
//   {
//     LogIn: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const MainNavigator = createSwitchNavigator(
//   {
//     Startup: StartupScreen,
//     Auth: AuthStackNavigator,
//     Shop: ShopNavigator
//   },
//   {
//     initialRouteName: "Startup"
//   }
// );

// export default createAppContainer(MainNavigator);

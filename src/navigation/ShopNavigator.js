import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList
} from "@react-navigation/drawer";
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
        options={ProductsOverviewScreen.screenOptions}
      />
      <ProductsStacknavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailScreen.screenOptions}
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

const OrdersStackNavigator = createStackNavigator();
const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="OrderList"
        component={OrdersScreen}
        options={OrdersScreen.screenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

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

const UserProductsStackNavigator = createStackNavigator();
const UserPorductsNavigator = () => {
  return (
    <UserProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UserProductsScreen.screenOptions}
      />
      <UserProductsStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductScreen.screenOptions}
      />
    </UserProductsStackNavigator.Navigator>
  );
};

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

const ShopDrawerNavigotor = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigotor.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="LOG OUT"
                onPress={() => {
                  dispatch(actions.logOut());
                  // props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigotor.Screen
        name="Product"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigotor.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: porps => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
              size={23}
              color={porps.color}
            />
          )
        }}
      />
      <ShopDrawerNavigotor.Screen
        name="UserProducts"
        component={UserPorductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-checkbox" : "md-checkbox"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigotor.Navigator>
  );
};

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

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="LogIn"
        component={AuthScreen}
        options={AuthScreen.options}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
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
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
//   },
//   {
//     initialRouteName: "Startup"
//   }
// );

// export default createAppContainer(MainNavigator);

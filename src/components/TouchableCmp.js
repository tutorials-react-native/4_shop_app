import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
} from "react-native";

const TouchableCmp = props => {
  const { children } = props;
  return Platform.select({
    ios: <TouchableOpacity {...props}>{children}</TouchableOpacity>,
    android: (
      <View style={styles.touchable}>
        <TouchableNativeFeedback {...props} useForeground>
          {children}
        </TouchableNativeFeedback>
      </View>
    )
  });
};

const styles = StyleSheet.create({
  touchable: {
    overflow: "hidden",
    borderRadius: 10
  }
});

export default TouchableCmp;

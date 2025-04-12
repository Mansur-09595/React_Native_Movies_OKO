import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/loading.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  animation: {
    width: width * 0.4,
    height: width * 0.4,
  },
});

export default Loading;
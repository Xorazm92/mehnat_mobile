import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ForgotPasswordScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Parolni Tiklash</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
});

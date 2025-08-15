import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const LoadingScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={["#2563eb", "#7c3aed", "#dc2626"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>UzTrain</Text>
        <Text style={styles.subtitle}>Temir Yo'l Ta'limi</Text>
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        <Text style={styles.loadingText}>Yuklanmoqda...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    marginBottom: 40,
  },
  loader: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.8,
  },
});

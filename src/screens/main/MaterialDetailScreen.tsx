import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MaterialsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Materiallar</Text>
  </View>
);

export const MaterialDetailScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Material Tafsilotlari</Text>
  </View>
);

export const PDFViewerScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>PDF Ko'rish</Text>
  </View>
);

export const SearchScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Qidiruv</Text>
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

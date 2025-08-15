import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#2563eb", "#7c3aed", "#dc2626"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="train" size={80} color="#ffffff" />
            </View>
            <Text style={styles.title}>UzTrain</Text>
            <Text style={styles.subtitle}>
              O'zbekiston Temir Yo'llari Ta'lim Platformasi
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <View style={styles.feature}>
              <Ionicons name="book-outline" size={24} color="#ffffff" />
              <Text style={styles.featureText}>290+ Ta'lim Materiallari</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="download-outline" size={24} color="#ffffff" />
              <Text style={styles.featureText}>Offline Ko'rish</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#ffffff" />
              <Text style={styles.featureText}>Sertifikatlar</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.primaryButtonText}>Kirish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Register" as never)}
            >
              <Text style={styles.secondaryButtonText}>Ro'yxatdan o'tish</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Temir yo'l ta'limi - kelajak sari yo'l
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresSection: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 16,
    opacity: 0.9,
  },
  buttonSection: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  footer: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.7,
    textAlign: "center",
  },
});

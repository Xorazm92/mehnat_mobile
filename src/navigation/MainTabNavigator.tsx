import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../components/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

// Screens
import { HomeScreen } from "../screens/main/HomeScreen";
import { CategoriesScreen } from "../screens/main/CategoriesScreen";
import { MaterialsScreen } from "../screens/main/MaterialsScreen";
import { DownloadsScreen } from "../screens/main/DownloadsScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { MaterialDetailScreen } from "../screens/main/MaterialDetailScreen";
import { PDFViewerScreen } from "../screens/main/PDFViewerScreen";
import { SearchScreen } from "../screens/main/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Search" 
      component={SearchScreen}
      options={{ title: "Qidiruv" }}
    />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CategoriesMain" 
      component={CategoriesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Materials" 
      component={MaterialsScreen}
      options={{ title: "Materiallar" }}
    />
    <Stack.Screen 
      name="MaterialDetail" 
      component={MaterialDetailScreen}
      options={{ title: "Material" }}
    />
    <Stack.Screen 
      name="PDFViewer" 
      component={PDFViewerScreen}
      options={{ title: "PDF Ko'rish" }}
    />
  </Stack.Navigator>
);

export const MainTabNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Categories") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Downloads") {
            iconName = focused ? "download" : "download-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{ title: "Bosh sahifa" }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesStack}
        options={{ title: "Kategoriyalar" }}
      />
      <Tab.Screen 
        name="Downloads" 
        component={DownloadsScreen}
        options={{ title: "Yuklab olishlar" }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
};

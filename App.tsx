import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { store } from './src/store';

const { width, height } = Dimensions.get('window');

// Brand Colors from your guide
const BRAND_COLORS = {
  primary: '#E67247',      // Orange
  success: '#40964B',      // Green  
  dark: '#3C3C3C',         // Dark Gray
  white: '#FFFFFF',
  background: '#F8FAFC',
  glass: 'rgba(255, 255, 255, 0.15)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
};

// Glass Morphism Component with Brand Colors
const BrandGlassCard = ({ children, style, intensity = 20, tint = 'light' }) => (
  <BlurView intensity={intensity} tint={tint} style={[styles.brandGlassCard, style]}>
    {children}
  </BlurView>
);

// Brand Neumorphic Component
const BrandNeumorphicCard = ({ children, style, pressed = false, color = BRAND_COLORS.white }) => (
  <View style={[
    styles.brandNeumorphicCard,
    { backgroundColor: color + '20' },
    pressed ? styles.neumorphicPressed : styles.neumorphicElevated,
    style
  ]}>
    {children}
  </View>
);

// Brand Floating Action Button
const BrandFloatingButton = ({ onPress, icon, color = BRAND_COLORS.primary }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress && onPress();
  };

  return (
    <Animated.View style={[styles.brandFloatingButton, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <BlurView intensity={80} tint="light" style={styles.floatingButtonBlur}>
          <LinearGradient
            colors={[color, color + 'CC']}
            style={styles.floatingButtonGradient}
          >
            <Ionicons name={icon} size={24} color={BRAND_COLORS.white} />
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Ultra Modern Brand-Aligned Home
const BrandModernHome = () => {
  const [count, setCount] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    setCount(count + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Brand Gradient Background */}
      <LinearGradient
        colors={[
          BRAND_COLORS.primary,
          BRAND_COLORS.success,
          BRAND_COLORS.dark,
          '#1a1a1a'
        ]}
        style={styles.brandBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Brand Floating Orbs */}
      <View style={styles.orbContainer}>
        <Animated.View style={[styles.orb, styles.orb1, { backgroundColor: BRAND_COLORS.primary + '40' }]} />
        <Animated.View style={[styles.orb, styles.orb2, { backgroundColor: BRAND_COLORS.success + '40' }]} />
        <Animated.View style={[styles.orb, styles.orb3, { backgroundColor: BRAND_COLORS.dark + '40' }]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            
            {/* Brand Glass Header */}
            <BrandGlassCard style={styles.headerCard} intensity={30}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.greeting}>Assalomu alaykum,</Text>
                  <Text style={styles.userName}>Foydalanuvchi</Text>
                </View>
                <BrandNeumorphicCard style={styles.notificationContainer} color={BRAND_COLORS.primary}>
                  <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications" size={24} color={BRAND_COLORS.primary} />
                    <View style={[styles.notificationBadge, { backgroundColor: BRAND_COLORS.success }]}>
                      <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
                  </TouchableOpacity>
                </BrandNeumorphicCard>
              </View>
            </BrandGlassCard>

            {/* Brand Hero Section */}
            <BrandGlassCard style={styles.heroCard} intensity={40}>
              <LinearGradient
                colors={[BRAND_COLORS.primary + 'E6', BRAND_COLORS.success + 'E6']}
                style={styles.heroGradient}
              >
                <Text style={styles.heroTitle}>🚂 UzTrain</Text>
                <Text style={styles.heroSubtitle}>
                  O'zbekiston Temir Yo'llari Ta'lim Platformasi
                </Text>
                
                {/* Brand Glass Stats */}
                <View style={styles.statsContainer}>
                  {[
                    { number: '290+', label: 'Materiallar', color: BRAND_COLORS.primary },
                    { number: '7', label: 'Kategoriya', color: BRAND_COLORS.success },
                    { number: '1000+', label: 'Foydalanuvchi', color: BRAND_COLORS.dark }
                  ].map((stat, index) => (
                    <BrandGlassCard key={index} style={styles.statCard} intensity={60}>
                      <LinearGradient
                        colors={[stat.color + '30', stat.color + '10']}
                        style={styles.statGradient}
                      >
                        <Text style={styles.statNumber}>{stat.number}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                      </LinearGradient>
                    </BrandGlassCard>
                  ))}
                </View>
              </LinearGradient>
            </BrandGlassCard>

            {/* Brand Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tezkor Harakatlar</Text>
              <View style={styles.quickActionsContainer}>
                {[
                  { icon: 'search', label: 'Qidiruv', color: BRAND_COLORS.primary },
                  { icon: 'grid', label: 'Kategoriyalar', color: BRAND_COLORS.success },
                  { icon: 'download', label: 'Yuklab olishlar', color: BRAND_COLORS.dark }
                ].map((action, index) => (
                  <TouchableOpacity key={index} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                    <BrandNeumorphicCard style={styles.quickActionCard} color={action.color}>
                      <LinearGradient
                        colors={[action.color + '30', action.color + '10']}
                        style={styles.quickActionGradient}
                      >
                        <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                          <Ionicons name={action.icon} size={28} color={BRAND_COLORS.white} />
                        </View>
                        <Text style={[styles.quickActionText, { color: action.color }]}>{action.label}</Text>
                      </LinearGradient>
                    </BrandNeumorphicCard>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Brand Categories */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Kategoriyalar</Text>
                <TouchableOpacity>
                  <Text style={[styles.seeAllText, { color: BRAND_COLORS.primary }]}>Barchasini ko'rish</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  { name: 'Qonunlar', count: 58, color: BRAND_COLORS.primary, icon: 'book' },
                  { name: 'Qoidalar', count: 20, color: BRAND_COLORS.success, icon: 'shield-checkmark' },
                  { name: 'Video Materiallar', count: 0, color: BRAND_COLORS.dark, icon: 'play-circle' },
                  { name: 'Slaydlar', count: 41, color: BRAND_COLORS.primary, icon: 'document-text' },
                  { name: 'Kasb Yo\'riqnomalari', count: 141, color: BRAND_COLORS.success, icon: 'briefcase' }
                ].map((category, index) => (
                  <TouchableOpacity key={index} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                    <BrandGlassCard style={styles.categoryCard} intensity={50}>
                      <LinearGradient
                        colors={[category.color + '30', category.color + '10']}
                        style={styles.categoryGradient}
                      >
                        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                          <Ionicons name={category.icon} size={24} color={BRAND_COLORS.white} />
                        </View>
                        <Text style={styles.categoryName} numberOfLines={2}>
                          {category.name}
                        </Text>
                        <Text style={[styles.categoryCount, { color: category.color }]}>
                          {category.count} ta material
                        </Text>
                      </LinearGradient>
                    </BrandGlassCard>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Brand Materials */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>So'nggi Materiallar</Text>
                <TouchableOpacity>
                  <Text style={[styles.seeAllText, { color: BRAND_COLORS.primary }]}>Barchasini ko'rish</Text>
                </TouchableOpacity>
              </View>
              
              {[
                { title: 'Temir yo\'l xavfsizligi qoidalari', type: 'pdf', views: 245, downloads: 89, color: BRAND_COLORS.primary },
                { title: 'Lokomotiv boshqaruv asoslari', type: 'ppt', views: 189, downloads: 67, color: BRAND_COLORS.success },
                { title: 'Signalizatsiya tizimi', type: 'pdf', views: 156, downloads: 43, color: BRAND_COLORS.dark }
              ].map((material, index) => (
                <TouchableOpacity key={index} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <BrandGlassCard style={styles.materialCard} intensity={40}>
                    <LinearGradient
                      colors={[material.color + '20', material.color + '05']}
                      style={styles.materialGradient}
                    >
                      <View style={styles.materialInfo}>
                        <Text style={styles.materialTitle} numberOfLines={2}>
                          {material.title}
                        </Text>
                        <Text style={styles.materialDescription} numberOfLines={1}>
                          Professional ta'lim materiallari
                        </Text>
                        <View style={styles.materialMeta}>
                          <View style={styles.materialMetaItem}>
                            <Ionicons name="eye" size={14} color={material.color} />
                            <Text style={[styles.materialMetaText, { color: material.color }]}>{material.views}</Text>
                          </View>
                          <View style={styles.materialMetaItem}>
                            <Ionicons name="download" size={14} color={material.color} />
                            <Text style={[styles.materialMetaText, { color: material.color }]}>{material.downloads}</Text>
                          </View>
                        </View>
                      </View>
                      <BrandNeumorphicCard style={[styles.materialTypeIcon, { backgroundColor: material.color + '20' }]}>
                        <Ionicons 
                          name={material.type === 'pdf' ? 'document-text' : 'easel'} 
                          size={24} 
                          color={material.color} 
                        />
                      </BrandNeumorphicCard>
                    </LinearGradient>
                  </BrandGlassCard>
                </TouchableOpacity>
              ))}
            </View>

            {/* Brand Interactive Demo */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Demo</Text>
              <TouchableOpacity onPress={handlePress}>
                <BrandGlassCard style={styles.demoCard} intensity={60}>
                  <LinearGradient
                    colors={[BRAND_COLORS.primary + '40', BRAND_COLORS.success + '40']}
                    style={styles.demoGradient}
                  >
                    <Text style={styles.demoTitle}>🎯 Brand-Aligned Design</Text>
                    <Text style={styles.demoText}>
                      Sizning brand guide'ingiz asosida yaratilgan professional mobil ilova
                    </Text>
                    
                    <BrandNeumorphicCard style={styles.demoButton} color={BRAND_COLORS.primary}>
                      <LinearGradient
                        colors={[BRAND_COLORS.primary, BRAND_COLORS.success]}
                        style={styles.demoButtonGradient}
                      >
                        <Text style={styles.demoButtonText}>
                          Bosildi: {count} marta ✨
                        </Text>
                      </LinearGradient>
                    </BrandNeumorphicCard>
                  </LinearGradient>
                </BrandGlassCard>
              </TouchableOpacity>
            </View>

            {/* Bottom Spacing */}
            <View style={{ height: 100 }} />
          </ScrollView>
        </Animated.View>
      </SafeAreaView>

      {/* Brand Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <BrandFloatingButton icon="add" color={BRAND_COLORS.primary} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)} />
        <BrandFloatingButton icon="heart" color={BRAND_COLORS.success} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)} />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BrandModernHome />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  brandBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.95,
  },
  orbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  orb: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.4,
  },
  orb1: {
    width: 200,
    height: 200,
    top: 100,
    left: -50,
  },
  orb2: {
    width: 150,
    height: 150,
    top: 300,
    right: -30,
  },
  orb3: {
    width: 120,
    height: 120,
    bottom: 200,
    left: 50,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Brand Glass Morphism Styles
  brandGlassCard: {
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: BRAND_COLORS.glassBorder,
    backgroundColor: BRAND_COLORS.glass,
    shadowColor: BRAND_COLORS.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  
  // Brand Neumorphism Styles
  brandNeumorphicCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  neumorphicElevated: {
    shadowColor: 'rgba(255, 255, 255, 0.6)',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  neumorphicPressed: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  
  // Header Styles with Brand Colors
  headerCard: {
    marginTop: 20,
    marginBottom: 24,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
    fontWeight: '500',
    // fontFamily: 'Satoshi-Medium', // Brand font
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    // fontFamily: 'Satoshi-Bold', // Brand font
  },
  notificationContainer: {
    padding: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BRAND_COLORS.white,
  },
  notificationBadgeText: {
    color: BRAND_COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
    // fontFamily: 'Satoshi-Bold',
  },
  
  // Hero Styles with Brand Colors
  heroCard: {
    marginBottom: 32,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
    // fontFamily: 'Satoshi-Black',
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
    // fontFamily: 'Satoshi-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statCard: {
    padding: 20,
    alignItems: 'center',
    minWidth: 90,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    marginBottom: 6,
    // fontFamily: 'Satoshi-Bold',
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    // fontFamily: 'Satoshi-Medium',
  },
  
  // Section Styles with Brand Typography
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    // fontFamily: 'Satoshi-Bold',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    // fontFamily: 'Satoshi-SemiBold',
  },
  
  // Quick Actions with Brand Colors
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 20,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    // fontFamily: 'Satoshi-SemiBold',
  },
  
  // Category Styles with Brand Colors
  categoryCard: {
    width: 150,
    marginRight: 18,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 24,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
    // fontFamily: 'Satoshi-SemiBold',
  },
  categoryCount: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
    // fontFamily: 'Satoshi-Medium',
  },
  
  // Material Styles with Brand Colors
  materialCard: {
    marginBottom: 18,
    overflow: 'hidden',
  },
  materialGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
  },
  materialInfo: {
    flex: 1,
    marginRight: 20,
  },
  materialTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: BRAND_COLORS.white,
    marginBottom: 8,
    // fontFamily: 'Satoshi-SemiBold',
  },
  materialDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 12,
    // fontFamily: 'Satoshi-Regular',
  },
  materialMeta: {
    flexDirection: 'row',
  },
  materialMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  materialMetaText: {
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '500',
    // fontFamily: 'Satoshi-Medium',
  },
  materialTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Demo Styles with Brand Colors
  demoCard: {
    overflow: 'hidden',
  },
  demoGradient: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 24,
  },
  demoTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
    // fontFamily: 'Satoshi-Bold',
  },
  demoText: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
    // fontFamily: 'Satoshi-Regular',
  },
  demoButton: {
    overflow: 'hidden',
  },
  demoButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    alignItems: 'center',
    borderRadius: 20,
  },
  demoButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 19,
    fontWeight: 'bold',
    // fontFamily: 'Satoshi-Bold',
  },
  
  // Floating Action Button Styles with Brand Colors
  fabContainer: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    flexDirection: 'column',
  },
  brandFloatingButton: {
    marginBottom: 18,
  },
  floatingButtonBlur: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  floatingButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState, AppDispatch } from '../../store';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchRecentMaterials, fetchPopularMaterials } from '../../store/slices/materialsSlice';
import { fetchBanners, trackBannerClick, trackBannerImpression } from '../../store/slices/bannersSlice';
import { useTheme } from '../../components/ThemeProvider';
import { BannerCarousel } from '../../components/BannerCarousel';
import { BannerProps } from '../../components/Banner';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  
  const { categories, isLoading: categoriesLoading } = useSelector((state: RootState) => state.categories);
  const { recentMaterials, popularMaterials, isLoading: materialsLoading } = useSelector((state: RootState) => state.materials);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecentMaterials(5));
    dispatch(fetchPopularMaterials(5));
  }, [dispatch]);

  const totalMaterials = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Assalomu alaykum,
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.name || 'Foydalanuvchi'}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#2563eb', '#7c3aed', '#dc2626']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>🚂 UzTrain</Text>
            <Text style={styles.heroSubtitle}>
              O'zbekiston Temir Yo'llari Ta'lim Platformasi
            </Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>{totalMaterials}+</Text>
                <Text style={styles.heroStatLabel}>Materiallar</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>{categories.length}</Text>
                <Text style={styles.heroStatLabel}>Kategoriya</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>1000+</Text>
                <Text style={styles.heroStatLabel}>Foydalanuvchi</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tezkor Harakatlar
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate('Search' as never)}
            >
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={styles.quickActionIcon}
              >
                <Ionicons name="search" size={24} color="#ffffff" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Qidiruv
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate('Categories' as never)}
            >
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.quickActionIcon}
              >
                <Ionicons name="grid" size={24} color="#ffffff" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Kategoriyalar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate('Downloads' as never)}
            >
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.quickActionIcon}
              >
                <Ionicons name="download" size={24} color="#ffffff" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Yuklab olishlar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Kategoriyalar
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories' as never)}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                Barchasini ko'rish
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.slice(0, 5).map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: colors.surface }]}
                onPress={() => navigation.navigate('Materials' as never, { categoryId: category.id })}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color="#ffffff" />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]} numberOfLines={2}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
                  {category.count} ta material
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Materials */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              So'nggi Materiallar
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                Barchasini ko'rish
              </Text>
            </TouchableOpacity>
          </View>
          {recentMaterials.slice(0, 3).map((material) => (
            <TouchableOpacity
              key={material.id}
              style={[styles.materialCard, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate('MaterialDetail' as never, { materialId: material.id })}
            >
              <View style={styles.materialInfo}>
                <Text style={[styles.materialTitle, { color: colors.text }]} numberOfLines={2}>
                  {material.title}
                </Text>
                <Text style={[styles.materialDescription, { color: colors.textSecondary }]} numberOfLines={1}>
                  {material.description}
                </Text>
                <View style={styles.materialMeta}>
                  <View style={styles.materialMetaItem}>
                    <Ionicons name="eye-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.materialMetaText, { color: colors.textSecondary }]}>
                      {material.views}
                    </Text>
                  </View>
                  <View style={styles.materialMetaItem}>
                    <Ionicons name="download-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.materialMetaText, { color: colors.textSecondary }]}>
                      {material.downloads}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.materialTypeIcon, { backgroundColor: colors.primary }]}>
                <Ionicons 
                  name={material.type === 'pdf' ? 'document-text' : material.type === 'ppt' ? 'easel' : 'document'} 
                  size={20} 
                  color="#ffffff" 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryCard: {
    width: 120,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    textAlign: 'center',
  },
  materialCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  materialInfo: {
    flex: 1,
    marginRight: 12,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  materialDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  materialMeta: {
    flexDirection: 'row',
  },
  materialMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  materialMetaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  materialTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

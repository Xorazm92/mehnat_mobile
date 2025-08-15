import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

const { width } = Dimensions.get('window');

export interface BannerProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  backgroundColor?: string;
  gradientColors?: string[];
  buttonText?: string;
  buttonIcon?: string;
  onPress?: () => void;
  onButtonPress?: () => void;
  type?: 'default' | 'gradient' | 'image' | 'announcement';
  priority?: 'high' | 'medium' | 'low';
}

export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  backgroundColor,
  gradientColors = ['#2563eb', '#7c3aed'],
  buttonText,
  buttonIcon,
  onPress,
  onButtonPress,
  type = 'default',
  priority = 'medium',
}) => {
  const { colors, isDark } = useTheme();

  const renderContent = () => (
    <View style={styles.content}>
      {subtitle && (
        <Text style={[styles.subtitle, { color: type === 'image' || type === 'gradient' ? '#ffffff' : colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
      <Text style={[
        styles.title, 
        { 
          color: type === 'image' || type === 'gradient' ? '#ffffff' : colors.text,
          fontSize: priority === 'high' ? 24 : priority === 'medium' ? 20 : 18,
        }
      ]}>
        {title}
      </Text>
      {description && (
        <Text style={[
          styles.description, 
          { color: type === 'image' || type === 'gradient' ? 'rgba(255,255,255,0.9)' : colors.textSecondary }
        ]}>
          {description}
        </Text>
      )}
      {(buttonText || buttonIcon) && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: type === 'image' || type === 'gradient' 
                ? 'rgba(255,255,255,0.2)' 
                : colors.primary,
            }
          ]}
          onPress={onButtonPress}
        >
          {buttonIcon && (
            <Ionicons 
              name={buttonIcon as any} 
              size={16} 
              color={type === 'image' || type === 'gradient' ? '#ffffff' : '#ffffff'} 
              style={buttonText ? { marginRight: 8 } : {}}
            />
          )}
          {buttonText && (
            <Text style={[
              styles.buttonText,
              { color: type === 'image' || type === 'gradient' ? '#ffffff' : '#ffffff' }
            ]}>
              {buttonText}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  if (type === 'image' && imageUrl) {
    return (
      <TouchableOpacity
        style={[styles.container, { height: priority === 'high' ? 200 : 150 }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}
          imageStyle={styles.backgroundImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
            style={styles.overlay}
          >
            {renderContent()}
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  if (type === 'gradient') {
    return (
      <TouchableOpacity
        style={[styles.container, { height: priority === 'high' ? 200 : 150 }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || colors.surface,
          height: priority === 'high' ? 200 : priority === 'medium' ? 150 : 120,
          borderWidth: type === 'announcement' ? 2 : 0,
          borderColor: type === 'announcement' ? colors.primary : 'transparent',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageBackground: {
    flex: 1,
  },
  backgroundImage: {
    borderRadius: 16,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Banner, BannerProps } from './Banner';

const { width } = Dimensions.get('window');

interface BannerCarouselProps {
  banners: BannerProps[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  onBannerPress?: (banner: BannerProps, index: number) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  autoPlay = true,
  autoPlayInterval = 5000,
  showPagination = true,
  onBannerPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoPlay && banners.length > 1) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, banners.length]);

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleScrollBeginDrag = () => {
    stopAutoPlay();
  };

  const handleScrollEndDrag = () => {
    if (autoPlay && banners.length > 1) {
      startAutoPlay();
    }
  };

  const handleBannerPress = (banner: BannerProps, index: number) => {
    if (onBannerPress) {
      onBannerPress(banner, index);
    } else if (banner.onPress) {
      banner.onPress();
    }
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {banners.map((banner, index) => (
          <View key={banner.id || index} style={styles.bannerContainer}>
            <Banner
              {...banner}
              onPress={() => handleBannerPress(banner, index)}
            />
          </View>
        ))}
      </ScrollView>
      
      {showPagination && banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex ? '#2563eb' : 'rgba(0,0,0,0.2)',
                  width: index === currentIndex ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  bannerContainer: {
    width: width,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    transition: 'all 0.3s ease',
  },
});

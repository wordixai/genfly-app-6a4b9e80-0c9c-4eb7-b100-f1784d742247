import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const ListingDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const { listing } = route.params;
  const [activeTab, setActiveTab] = useState('details');

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      navigation.navigate('SignIn');
      return;
    }
    // Navigate to messages or show contact form
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigation.navigate('SignIn');
      return;
    }
    // Navigate to booking screen
  };

  const listingTypeLabel = {
    ForSale: "For Sale",
    ForRent: "For Rent",
    Booking: "Booking",
  }[listing.listingType];

  return (
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: listing.image }} style={styles.mainImage} />
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{listingTypeLabel}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Listing Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{listing.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.location}>{listing.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{listing.rating} ({listing.reviewCount} reviews)</Text>
        </View>
        <Text style={styles.price}>
          {formatCurrency(listing.price, listing.currency)}
          {listing.listingType === 'ForRent' || listing.listingType === 'Booking' 
            ? listing.category === 'Car' 
              ? ' / day' 
              : listing.category === 'Hotel' 
                ? ' / night' 
                : ''
            : ''}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'details' && styles.activeTab]} 
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'features' && styles.activeTab]} 
          onPress={() => setActiveTab('features')}
        >
          <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>Features</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'location' && styles.activeTab]} 
          onPress={() => setActiveTab('location')}
        >
          <Text style={[styles.tabText, activeTab === 'location' && styles.activeTabText]}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]} 
          onPress={() => setActiveTab('reviews')}
        >
          <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'details' && (
          <View>
            <Text style={styles.sectionTitle}>About this {listing.category.toLowerCase()}</Text>
            <Text style={styles.description}>{listing.description}</Text>
            
            {/* Category specific details would go here */}
          </View>
        )}

        {activeTab === 'features' && (
          <View>
            <Text style={styles.sectionTitle}>Features & Amenities</Text>
            <Text style={styles.description}>Features would be displayed here based on the listing category.</Text>
          </View>
        )}

        {activeTab === 'location' && (
          <View>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>Map would be displayed here</Text>
            </View>
            <Text style={styles.description}>
              Located in {listing.location}. Exact location will be provided after booking.
            </Text>
          </View>
        )}

        {activeTab === 'reviews' && (
          <View>
            <Text style={styles.sectionTitle}>Reviews ({listing.reviewCount})</Text>
            <View style={styles.overallRating}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons 
                    key={star}
                    name={star <= Math.floor(listing.rating) ? "star" : "star-outline"} 
                    size={20} 
                    color="#FFD700" 
                  />
                ))}
              </View>
              <Text style={styles.overallRatingText}>{listing.rating} out of 5</Text>
            </View>
            
            {/* Sample reviews would go here */}
            <Text style={styles.description}>Reviews would be displayed here.</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {listing.listingType === 'ForSale' && (
          <TouchableOpacity style={styles.actionButton} onPress={handleContactSeller}>
            <Text style={styles.actionButtonText}>Contact Seller</Text>
          </TouchableOpacity>
        )}
        
        {(listing.listingType === 'ForRent' || listing.listingType === 'Booking') && (
          <TouchableOpacity style={styles.actionButton} onPress={handleBookNow}>
            <Text style={styles.actionButtonText}>
              {listing.listingType === 'Booking' ? 'Book Now' : 'Request to Book'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  badge: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0284c7',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0284c7',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#0284c7',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  mapPlaceholderText: {
    color: '#999',
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  overallRatingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ListingDetailScreen;
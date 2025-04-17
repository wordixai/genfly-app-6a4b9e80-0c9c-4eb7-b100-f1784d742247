import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { trpc } from '../utils/trpc';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for featured listings
const featuredProperties = [
  {
    id: "prop1",
    title: "Modern Apartment with Ocean View",
    description: "Beautiful 2-bedroom apartment with stunning ocean views, modern amenities, and a prime location.",
    price: 450000,
    currency: "USD",
    location: "Miami, FL",
    category: "Property",
    listingType: "ForSale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "prop2",
    title: "Luxury Villa with Pool",
    description: "Spacious 4-bedroom villa with private pool, garden, and modern interior design.",
    price: 850000,
    currency: "USD",
    location: "Los Angeles, CA",
    category: "Property",
    listingType: "ForSale",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    rating: 4.9,
    reviewCount: 36,
  },
];

const featuredHotels = [
  {
    id: "hotel1",
    title: "Grand Luxury Resort & Spa",
    description: "5-star luxury resort with ocean views, multiple pools, and world-class dining options.",
    price: 350,
    currency: "USD",
    location: "Cancun, Mexico",
    category: "Hotel",
    listingType: "Booking",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "hotel2",
    title: "City Center Boutique Hotel",
    description: "Charming boutique hotel in the heart of the city with unique rooms and personalized service.",
    price: 180,
    currency: "USD",
    location: "Paris, France",
    category: "Hotel",
    listingType: "Booking",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    rating: 4.7,
    reviewCount: 92,
  },
];

const categories = [
  { id: 'property', name: 'Properties', icon: 'home' },
  { id: 'hotel', name: 'Hotels', icon: 'bed' },
  { id: 'car', name: 'Cars', icon: 'car' },
  { id: 'experience', name: 'Experiences', icon: 'compass' },
  { id: 'ticket', name: 'Tickets', icon: 'ticket' },
];

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToListing = (listing) => {
    navigation.navigate('ListingDetail', { listing });
  };

  const navigateToCategory = (category) => {
    navigation.navigate('Explore', { category });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Your Perfect Place</Text>
        <Text style={styles.heroSubtitle}>
          Discover properties, hotels, cars, experiences, and tickets all in one place.
        </Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search listings...</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryItem}
              onPress={() => navigateToCategory(category.id)}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={24} color="#0284c7" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Properties */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Properties</Text>
          <TouchableOpacity onPress={() => navigateToCategory('property')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredProperties.map((property) => (
            <TouchableOpacity 
              key={property.id} 
              style={styles.listingCard}
              onPress={() => navigateToListing(property)}
            >
              <Image source={{ uri: property.image }} style={styles.listingImage} />
              <View style={styles.listingBadge}>
                <Text style={styles.listingBadgeText}>{property.listingType === 'ForSale' ? 'For Sale' : 'For Rent'}</Text>
              </View>
              <View style={styles.listingContent}>
                <Text style={styles.listingTitle}>{property.title}</Text>
                <View style={styles.listingLocation}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.listingLocationText}>{property.location}</Text>
                </View>
                <Text style={styles.listingPrice}>{formatCurrency(property.price, property.currency)}</Text>
                <View style={styles.listingRating}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.listingRatingText}>{property.rating} ({property.reviewCount})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Hotels */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Hotels</Text>
          <TouchableOpacity onPress={() => navigateToCategory('hotel')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredHotels.map((hotel) => (
            <TouchableOpacity 
              key={hotel.id} 
              style={styles.listingCard}
              onPress={() => navigateToListing(hotel)}
            >
              <Image source={{ uri: hotel.image }} style={styles.listingImage} />
              <View style={styles.listingBadge}>
                <Text style={styles.listingBadgeText}>Booking</Text>
              </View>
              <View style={styles.listingContent}>
                <Text style={styles.listingTitle}>{hotel.title}</Text>
                <View style={styles.listingLocation}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.listingLocationText}>{hotel.location}</Text>
                </View>
                <Text style={styles.listingPrice}>{formatCurrency(hotel.price, hotel.currency)} / night</Text>
                <View style={styles.listingRating}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.listingRatingText}>{hotel.rating} ({hotel.reviewCount})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    padding: 20,
    backgroundColor: '#0284c7',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#999',
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#0284c7',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
  },
  listingCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 250,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listingImage: {
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#0284c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  listingBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  listingContent: {
    padding: 12,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  listingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  listingLocationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  listingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listingRatingText: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default HomeScreen;
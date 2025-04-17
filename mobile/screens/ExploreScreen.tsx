import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for different categories
const mockListings = {
  property: [
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
    // More properties...
  ],
  hotel: [
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
    // More hotels...
  ],
  car: [
    {
      id: "car1",
      title: "2023 Tesla Model 3",
      description: "Electric sedan with long range, autopilot features, and premium interior.",
      price: 45000,
      currency: "USD",
      location: "San Francisco, CA",
      category: "Car",
      listingType: "ForSale",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
      rating: 4.9,
      reviewCount: 42,
    },
    {
      id: "car2",
      title: "2022 BMW X5",
      description: "Luxury SUV with powerful engine, advanced technology, and spacious interior.",
      price: 65000,
      currency: "USD",
      location: "Miami, FL",
      category: "Car",
      listingType: "ForSale",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      rating: 4.8,
      reviewCount: 36,
    },
    // More cars...
  ],
  experience: [
    {
      id: "exp1",
      title: "Wine Tasting Tour",
      description: "Guided tour of local wineries with tastings, food pairings, and transportation included.",
      price: 120,
      currency: "USD",
      location: "Napa Valley, CA",
      category: "Experience",
      listingType: "Booking",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
      rating: 4.8,
      reviewCount: 64,
    },
    // More experiences...
  ],
  ticket: [
    {
      id: "ticket1",
      title: "Broadway Musical Tickets",
      description: "Premium seats for the hit Broadway musical with an award-winning cast.",
      price: 150,
      currency: "USD",
      location: "New York, NY",
      category: "Ticket",
      listingType: "Booking",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
      rating: 4.9,
      reviewCount: 86,
    },
    // More tickets...
  ],
};

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

const ExploreScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialCategory = route.params?.category || 'property';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const listings = mockListings[activeCategory] || [];

  const navigateToListing = (listing) => {
    navigation.navigate('ListingDetail', { listing });
  };

  const renderListingItem = ({ item }) => {
    const listingTypeLabel = {
      ForSale: "For Sale",
      ForRent: "For Rent",
      Booking: "Booking",
    }[item.listingType];

    return (
      <TouchableOpacity 
        style={styles.listingCard}
        onPress={() => navigateToListing(item)}
      >
        <Image source={{ uri: item.image }} style={styles.listingImage} />
        <View style={styles.listingBadge}>
          <Text style={styles.listingBadgeText}>{listingTypeLabel}</Text>
        </View>
        <View style={styles.listingContent}>
          <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.listingLocation}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.listingLocationText} numberOfLines={1}>{item.location}</Text>
          </View>
          <Text style={styles.listingPrice}>
            {formatCurrency(item.price, item.currency)}
            {item.listingType === 'ForRent' || item.listingType === 'Booking' 
              ? item.category === 'Car' 
                ? ' / day' 
                : item.category === 'Hotel' 
                  ? ' / night' 
                  : ''
              : ''}
          </Text>
          <View style={styles.listingRating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.listingRatingText}>{item.rating} ({item.reviewCount})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search listings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options" size={20} color="#0284c7" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={[
              styles.categoryTab,
              activeCategory === category.id && styles.activeCategoryTab
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Ionicons 
              name={category.icon} 
              size={18} 
              color={activeCategory === category.id ? '#0284c7' : '#666'} 
              style={styles.categoryIcon}
            />
            <Text 
              style={[
                styles.categoryName,
                activeCategory === category.id && styles.activeCategoryName
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filters (conditionally rendered) */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>
          {/* Filter controls would go here */}
          <Text style={styles.filterLabel}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              keyboardType="numeric"
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              keyboardType="numeric"
            />
          </View>
          
          <TouchableOpacity style={styles.applyFiltersButton}>
            <Text style={styles.applyFiltersText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Listings */}
      <FlatList
        data={listings}
        renderItem={renderListingItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listingsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryTab: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryName: {
    color: '#0284c7',
    fontWeight: '600',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  priceSeparator: {
    marginHorizontal: 8,
  },
  applyFiltersButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyFiltersText: {
    color: 'white',
    fontWeight: '600',
  },
  listingsContainer: {
    padding: 8,
  },
  listingCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listingImage: {
    height: 120,
    width: '100%',
  },
  listingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#0284c7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  listingBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  listingContent: {
    padding: 10,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  listingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listingLocationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  listingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listingRatingText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ExploreScreen;
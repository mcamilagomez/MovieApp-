import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

// List of movie categories with IDs and display names
const categories = [
  { id: "popular", name: "Populares" },
  { id: "now_playing", name: "En Cartelera" },
  { id: "upcoming", name: "Próximamente" },
  { id: "top_rated", name: "Top Rated" },
];

// Component to display scrollable category tabs
const CategoryTabs = ({ activeCategory, onPress }) => (
  <View style={styles.outerContainer}>
    {/* Horizontal scrollable bar for category tabs */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* Render each category as a tab */}
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            activeCategory === category.id && styles.activeTab,
          ]}
          onPress={() => onPress(category.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === category.id && styles.activeText,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// Style definitions for layout and appearance
const styles = StyleSheet.create({
  outerContainer: {
    height: 50,
    backgroundColor: "white",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tab: {
    minWidth: 100,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    height: 36,
  },
  activeTab: {
    backgroundColor: "#9f0c0c",
  },
  tabText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    includeFontPadding: false,
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoryTabs;

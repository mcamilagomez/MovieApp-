import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Genre list with associated icons
const genres = [
  { id: 28, name: "Acción", icon: "sword-cross" },
  { id: 16, name: "Animación", icon: "animation" },
  { id: 12, name: "Aventura", icon: "compass" },
  { id: 10752, name: "Bélica", icon: "tank" },
  { id: 878, name: "Ciencia ficción", icon: "robot" },
  { id: 35, name: "Comedia", icon: "emoticon-happy" },
  { id: 80, name: "Crimen", icon: "police-badge" },
  { id: 99, name: "Documental", icon: "book-open-page-variant" },
  { id: 18, name: "Drama", icon: "drama-masks" },
  { id: 10751, name: "Familia", icon: "home-heart" },
  { id: 14, name: "Fantasía", icon: "magic-staff" },
  { id: 36, name: "Historia", icon: "history" },
  { id: 9648, name: "Misterio", icon: "magnify" },
  { id: 10402, name: "Música", icon: "music" },
  { id: 10770, name: "Película de TV", icon: "television-classic" },
  { id: 10749, name: "Romance", icon: "heart" },
  { id: 53, name: "Suspense", icon: "knife" },
  { id: 27, name: "Terror", icon: "ghost" },
  { id: 37, name: "Western", icon: "horse" },
];

// Component to render genre tabs with icons
const GenreTabs = ({ activeGenre, onSelectGenre }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 10 }}
  >
    {/* Iterate through each genre to display a button with icon */}
    {genres.map((genre) => {
      const isActive = genre.id === activeGenre; // Check if current genre is active
      return (
        <TouchableOpacity
          key={genre.id}
          onPress={() => onSelectGenre(genre.id)} // Handle genre selection
          style={{
            alignItems: "center",
            marginRight: 16,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 12,
            width: 70,
            height: 60,
            backgroundColor: isActive ? "#9f0c0c" : "#f0f0f0",
          }}
        >
          {/* Genre icon */}
          <Icon
            name={genre.icon}
            size={24}
            color={isActive ? "#fff" : "#333"}
          />
          {/* Genre name */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              color: isActive ? "#fff" : "#333",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {genre.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default GenreTabs;

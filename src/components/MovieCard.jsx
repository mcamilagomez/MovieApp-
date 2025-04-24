import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "../utils/constants";

// Reusable movie card component
const MovieCard = ({ movie, onPress }) => {
  // Function to format the release date into a readable string
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible"; // Return fallback if date is missing
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    // Touchable container triggers the onPress callback when tapped
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Movie poster image */}
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />

      {/* Movie information section */}
      <View style={styles.info}>
        {/* Movie title, limited to 2 lines */}
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        {/* Rating section */}
        <View style={styles.metadataRow}>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </Text>
        </View>

        {/* Release date section */}
        <View style={styles.metadataRow}>
          <Text style={styles.releaseDate}>
            {formatDate(movie.release_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles for the MovieCard component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    width: 90,
    height: 135,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
    lineHeight: 22,
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  rating: {
    fontSize: 15,
    color: "#FFA500",
    fontWeight: "700",
    marginRight: 15,
  },
  releaseDate: {
    fontSize: 14,
    color: "#555",
  },
  genres: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});

export default MovieCard;

import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { getMovieDetails, getMovieCredits } from "../services/api";
import { IMAGE_BASE_URL } from "../utils/constants";

// MovieDetailScreen displays detailed information about a selected movie
const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details and credits on component mount
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch both movie details and credits in parallel
        const [movieDetails, movieCredits] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
        ]);
        setMovie(movieDetails);
        setCredits(movieCredits);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // Extract director name from credits
  const getDirector = () => {
    if (!credits) return "Not available";
    const director = credits.crew.find((person) => person.job === "Director");
    return director ? director.name : "Not available";
  };

  // Join all genre names into a single string
  const getGenres = () => {
    if (!movie || !movie.genres) return "Not available";
    return movie.genres.map((genre) => genre.name).join(", ");
  };

  // Format release date into a readable string
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("es-ES", options);
    return formattedDate;
  };

  // Show loading indicator while fetching data
  if (loading || !movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render movie detail UI
  return (
    <ScrollView style={styles.container}>
      {/* Movie poster */}
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        {/* Movie title */}
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.metadataContainer}>
          {/* Release date */}
          <Text style={styles.releaseDate}>
            Release Date: {formatDate(movie.release_date)}
          </Text>

          {/* Average rating */}
          <Text style={styles.rating}>
            ⭐ {movie.vote_average.toFixed(1)}/10
          </Text>

          {/* Genres */}
          <Text style={styles.metadata}>
            <Text style={styles.metadataLabel}>Genres: </Text>
            {getGenres()}
          </Text>

          {/* Director */}
          <Text style={styles.metadata}>
            <Text style={styles.metadataLabel}>Director: </Text>
            {getDirector()}
          </Text>

          {/* Overview */}
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the MovieDetailScreen component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metadataContainer: {
    marginBottom: 15,
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
  },
  metadata: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  metadataLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginTop: 10,
  },
});

export default MovieDetailScreen;

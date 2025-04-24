import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import { debounce } from "lodash";
import {
  getPopularMovies,
  searchMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMoviesByGenre,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import GenreTabs from "../components/GenreTabs";

// Main component for the home screen
const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");
  const [isSearching, setIsSearching] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);

  useEffect(() => {
    fetchMovies(activeCategory);
  }, [activeCategory]);

  const fetchMovies = async (category) => {
    setActiveGenre(null);
    setLoading(true);
    try {
      let response;
      const today = new Date().toISOString().split("T")[0];
      switch (category) {
        case "now_playing":
          response = await getNowPlayingMovies();
          break;
        case "upcoming":
          response = await getUpcomingMovies();
          response = response.filter((movie) => movie.release_date > today);
          break;
        case "top_rated":
          response = await getTopRatedMovies();
          break;
        default:
          response = await getPopularMovies();
      }
      setMovies(response);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGenre = async (genreId) => {
    setActiveGenre(genreId);
    setIsSearching(false);
    setLoading(true);
    try {
      const moviesByGenre = await getMoviesByGenre(genreId);
      setMovies(moviesByGenre);
    } catch (error) {
      console.error("Error loading genre movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce(async (query) => {
    if (query.trim() === "") {
      cancelSearch();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  }, 500); // Debounce to reduce API calls while typing

  const cancelSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchMovies(activeCategory);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchMovies(activeCategory);
    }
  }, [activeCategory, isSearching]);

  useEffect(() => {
    if (searchQuery === "" && isSearching) {
      cancelSearch();
    } else if (!isSearching) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.whiteContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          onClear={cancelSearch}
        />
        <CategoryTabs
          activeCategory={activeCategory}
          onPress={(category) => {
            if (isSearching) cancelSearch();
            setActiveCategory(category);
          }}
        />
        <View style={styles.genreTabsContainer}>
          <GenreTabs
            activeGenre={activeGenre}
            onSelectGenre={handleSelectGenre}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#9f0c0c" style={styles.loader} />
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() =>
                  navigation.navigate("MovieDetail", { movieId: item.id })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.noResults}>
                {isSearching ? "No results found" : "No movies available"}
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#9f0c0c",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  genreTabsContainer: {
    marginBottom: 10,
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  noResults: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;

import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

// Creating an Axios instance with default configurations
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "es-ES",
  },
});

// Fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await api.get("/movie/popular"); // Making a GET request to get popular movies
    return response.data.results; // Returning the results (list of popular movies)
  } catch (error) {
    console.error("Error fetching popular movies:", error); // Logging any errors
    return []; // Returning an empty array in case of error
  }
};

// Search for movies by query
export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });
    return response.data.results; // Returning the search results (list of movies)
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Get details for a specific movie by movieId
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`); // Making a GET request for movie details
    return response.data; // Returning the movie details
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Get currently playing movies
export const getNowPlayingMovies = async () => {
  const response = await api.get("/movie/now_playing"); // Making a GET request for now playing movies
  return response.data.results; // Returning the results (list of currently playing movies)
};

// Get upcoming movies (release date greater than or equal to today)
export const getUpcomingMovies = async () => {
  const today = new Date().toISOString().split("T")[0]; // Getting today's date in YYYY-MM-DD format
  const response = await api.get("/movie/upcoming", {
    params: {
      region: "CO",
      language: "es-CO",
      release_date_gte: today,
    },
  });
  return response.data.results; // Returning the results (list of upcoming movies)
};

// Get top rated movies
export const getTopRatedMovies = async () => {
  const response = await api.get("/movie/top_rated"); // Making a GET request for top-rated movies
  return response.data.results; // Returning the results (list of top-rated movies)
};

// Get credits (cast and crew) for a specific movie
export const getMovieCredits = (movieId) => {
    return fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
      (response) => response.json()
    );
  };
  
// Get movies by genre
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: genreId, // Adding the genre ID as a parameter
      },
    });
    return response.data.results; // Returning the results (list of movies in the given genre)
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};
import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Functional component that represents a search bar
const SearchBar = ({ value, onChangeText, onSubmitEditing, onClear }) => {
  return (
    // Main container for the search bar
    <View style={styles.container}>
      {/* Magnifying glass icon at the beginning of the bar */}
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      {/* Text input for entering the search query */}
      <TextInput
        style={styles.input}
        placeholder="Buscar películas..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        accessibilityLabel="Campo de búsqueda"
        placeholderTextColor="#888"
      />
      {/* Clear button, only shown when there is input text */}
      {value.length > 0 && (
        <TouchableOpacity 
          onPress={onClear} 
          style={styles.clearButton} 
          accessibilityLabel="Borrar búsqueda"
        >
          <Ionicons name="close-circle" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles for the SearchBar component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 16,
    marginBottom: 8,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchBar;

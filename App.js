import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import MovieDetailScreen from "./src/screens/MovieDetail";

// Create a Stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack.Navigator is the container for all stack screens */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen} // Component to be rendered for this screen
          options={{
            title: "MovieApp",
            headerStyle: {
              backgroundColor: "#9f0c0c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        {/* Define the Movie Detail screen */}
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: "Detalles",
            headerStyle: {
              backgroundColor: "#9f0c0c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

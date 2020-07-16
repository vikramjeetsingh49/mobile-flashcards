import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { createStore } from "redux";
import middleware from "./middleware";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { primary, accent, gray, purple } from "./utils/colors";
import { ListNav } from "./navigation/ListNav";
import { DeckNav } from "./navigation/DeckNav";
import { setLocalNotification } from "./utils/helpers";

const store = createStore(reducer, middleware);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: true,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
    primary: primary,
    accent: accent,
  },
};

const Tab = createBottomTabNavigator();

function App() {
  React.useEffect(() => {
    setLocalNotification();
  }, []);
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Decks") {
                  iconName = focused ? "cards-playing-outline" : "cards";
                } else if (route.name === "Add Deck") {
                  iconName = focused ? "minus-circle" : "plus-circle";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeBackgroundColor: purple,
              activeTintColor: "white",
              inactiveTintColor: gray,
            }}
          >
            <Tab.Screen name="Decks" component={ListNav} />
            <Tab.Screen name="Add Deck" component={DeckNav} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { createStackNavigator } from "@react-navigation/stack";
import NewDeck from "../components/NewDeck";
import React from "react";

const StackDeck = createStackNavigator();
export const DeckNav = () => (
  <StackDeck.Navigator>
    <StackDeck.Screen
      name="Add Deck"
      component={NewDeck}
      options={() => ({
        title: "Add Deck",
        headerTitleAlign: "center",
      })}
    />
  </StackDeck.Navigator>
);

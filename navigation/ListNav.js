import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import DeckList from "../components/DeckList";
import Deck from "../components/Deck";
import NewCard from "../components/NewCard";
import Quiz from "../components/Quiz";

const StackDecks = createStackNavigator();

export const ListNav = () => (
  <StackDecks.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      ...TransitionPresets.SlideFromRightIOS,
    }}
    headerMode="float"
    animation="fade"
  >
    <StackDecks.Screen
      name="DeckList"
      component={DeckList}
      options={() => ({
        title: "Deck List",
        headerTitleAlign: "center",
      })}
    />
    <StackDecks.Screen
      name="Deck"
      component={Deck}
      options={({ route }) => {
        return {
          title: route.params.title,
          headerTitleAlign: "center",
          headerTruncatedBackTitle: true,
        };
      }}
    />
    <StackDecks.Screen
      name="AddCard"
      component={NewCard}
      options={({route}) => {
        return {
          title: "Add Card",
          headerTitleAlign: "center",
          headerTruncatedBackTitle: true,
        };
      }}
    />
    <StackDecks.Screen
      name="Quiz"
      component={Quiz}
      options={({ route }) => {
        return {
          title: "Take Quiz : " + route.params.title,
          headerTitleAlign: "center",
          headerTruncatedBackTitle: true,
          headerBackTitle: route.params.title,
          tabBarVisible: false,
        };
      }}
    />
  </StackDecks.Navigator>
);

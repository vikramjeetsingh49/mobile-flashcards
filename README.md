# Mobile Flashcards

In the app, a user will see the list of decks created with the number of cards in individual deck, 
on pressing the specific deck user will go the individual deck view with animation effect. User can then add a new card to the deck or start the quiz.
In quiz view , user can clik show answer and the view will flip to show answer as well.
In the end user will get the result,then user can either can go back or restart the quiz.

Users will be able to 
* view the deck list
* add a new deck
* view specific deck
* add new card or delete the deck
* start the quiz and check whether you guessed the answer correct or incorrect

## Requirements

* Node 8.16.0 or Node 10.16.0 or later (https://nodejs.org/en/)
* Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Expo-Cli `npm install -g expo-cli`


##  Creating an App 

To Get Started Immediately:

* Download the zip file or clone the repository using git clone command (https://git-scm.com/docs)
* Navigate to the repository.
* Open Terminal Window.
* install all project dependencies with `npm install`.
* start the development server with `npm start`.
* run in web mode with `yarn web` or `expo-client web`.

## Available Scripts

In the project directory, you can run:

### `npm install` 

This command will install all the packages required to run the project.

### `npm run start`

Runs the app in the your connected device or simulator<br />

### `yarn web`

Runs the app in the development mode.<br />
Open [http://localhost:19006](http://localhost:19006) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Screens 
![Image of DeckList](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/decklist.png?raw=true)
![Image of NewDeck](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/newdeck.png?raw=true)
![Image of Deck](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/deck.png?raw=true)
![Image of NewCard](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/newcard.png?raw=true)
![Image of Question](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/question.png?raw=true)
![Image of Answer](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/answer.png?raw=true)
![Image of Result](https://github.com/vikramjeetsingh49/mobile-flashcards/blob/master/screens/result-1.png?raw=true)

## Backend Server

The provided file [`api.js`](src/utils/api.js) contains the methods to perform necessary operations on the backend:

* [`getAllDecks`](#getAllDecks)
* [`saveDeckTitle`](#saveDeckTitle)
* [`saveQuestion`](#savequestion)
* [`removeDeck`](#removeDeck)

### `getAllDecks`

Method Signature:

```js
getAllDecks()
```

* Load data from Localstorage using AsyncStorage
* This collection represents the list of decks created in your app.

### `saveDeckTitle`

Method Signature:

```js
saveDeckTitle(title)
```

* title: `<String>` contains the title /name of the new deck
* Saves into Localstorage using AsyncStorage

### `remove`

Method Signature:

```js
removeDeck(title)
```

* title: `<String>` contains the name of the deck to be deleted
* Remove entry from localstorage using  AsyncStorage

### `addCardToDeck`

Method Signature:

```js
addCardToDeck(title, card)
```

* title: `<String>` conatins the title /name of the deck  
* card: `<Object>` contains the question and answer value for the new card added to deck.
* Saves into Localstorage using AsyncStorage


## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn React Native, check out [React Native documentation](https://reactnative.dev/).

## License

Create React Native App is open source software licensed as MIT.

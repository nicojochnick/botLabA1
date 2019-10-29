import React from "react";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import rootReducer from './src/redux/reducers'

import { createStore, applyMiddleware} from 'redux'
import {Provider} from "react-redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {saveState} from './src/localStorage'
import { PersistGate } from 'redux-persist/integration/react'
import TopStack from './src/navigation/topStack';
import thunk from 'redux-thunk'
import { MenuProvider } from 'react-native-popup-menu';
import {reactReduxFirebase, firebaseReducer, getFirebase, firebase} from 'react-redux-firebase';
import {compose} from 'react-native';



const persistConfig = {
  key: 'root',
  storage,
};

const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
};

//const comp = compose(reactReduxFirebase(firebase, reduxFirebaseConfig));

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persists = persistStore(store);


//Uncomment to reset
// (async () => { await persists.purge(); })();

store.subscribe(() => {
  saveState({

  });
});



export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persists}>
              <MenuProvider>
                <TopStack/>
              </MenuProvider>
          </PersistGate>
        </Provider>
    );}
}

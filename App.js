import React from "react";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import rootReducer from './src/redux/reducers'

import { createStore } from 'redux'
import {Provider} from "react-redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {saveState} from './src/localStorage'
import { PersistGate } from 'redux-persist/integration/react'
import TopStack from './src/navigation/topStack';



const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persists = persistStore(store);

//Uncomment to reset state
//(async () => { await persists.purge(); })();

store.subscribe(() => {
  saveState({
    goals: store.getState()
  });
});


export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persists}>
            <TopStack/>
          </PersistGate>
        </Provider>
    );}
}

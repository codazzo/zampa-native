/* eslint-disable import/prefer-default-export */

// import { AsyncStorage } from 'react-native';
import data from './data.json';

// const TAGS_CACHE_KEY = 'TAGS_CACHE';

/*
 * I've used this function during development to save data to AyncStorage
 * on the first deployment and load it from there afterwards.
 * This speeds up deployment of app trough Expo considerably.
 */
// export const getData = async () => {
//   const dataStr = await AsyncStorage.getItem(TAGS_CACHE_KEY);
//   return JSON.parse(dataStr);
// }

// (async () => {
//   await AsyncStorage.setItem(TAGS_CACHE_KEY, JSON.stringify(data));
// })()


export const getData = () => Promise.resolve(data);

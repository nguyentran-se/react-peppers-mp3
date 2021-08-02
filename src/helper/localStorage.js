import { PEPPERS } from "constant/localStorage";
const localStorage = window.localStorage;

export const getLocalStorage = (key) => {
   try {
      let result = localStorage.getItem(key);
      if (!result) {
         // throw new Error(`${key} NOT EXIST!`);
         return null;
      }
      return JSON.parse(result);
   } catch (error) {
      console.error(`[getLocalStorage]: ${error.message}`);
   }
};

export const setLocalStorage = (key, value) => {
   try {
      let stringifyValue = JSON.stringify(value);
      if (
         key === PEPPERS ||
         key === "LOCATION_KEYS" ||
         localStorage.getItem(key) === null
      )
         localStorage.setItem(key, stringifyValue);
      else throw new Error(`${key} HAS ALREADY EXIST`);
   } catch (error) {
      console.error(`[setLocalStorage]: ${error.message}`);
   }
};

export const insertValueIntoKeyLS = (key, value) => {
   try {
      if (typeof value !== "object")
         throw new Error("value must be plain object");
      const oldValue = getLocalStorage(key);
      if (!oldValue) return;
      const newValue = { ...oldValue, ...value };
      localStorage.setItem(key, JSON.stringify(newValue));
   } catch (error) {
      console.error(`insertValueIntoKey: ${error.message}`);
   }
};

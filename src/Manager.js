import firebaseimport from "./firebaseimport";
import {
    getAuth,
    onAuthStateChanged,
  } from "firebase/auth";
  
import { onSnapshot, getFirestore, doc, collection } from 'firebase/firestore';

import { openDB } from "idb";

const DBCollections = ["campeonatos", "membros", "squads", "pistas"];
const auth = getAuth(firebaseimport);
class Manager { 
  constructor(user) {
    const baseState = {
      user: user,
      loginForm: true,
    }
    const baseListeners = {
      user: [],
      loginForm: [],
    }
    openDB("shooting-booth", 1)
    .then((db) => {
      this.localDb = db;
    })
    this.state = DBCollections.reduce((acc, cur) => ({ ...acc, [cur]: null }), baseState);
    this.listeners = DBCollections.reduce((acc, cur) => ({ ...acc, [cur]: [] }), baseListeners);
    const onSnapsFac = ( listOfCollections ) => 
      listOfCollections.map( collectionName => onSnapshot( doc(collection(this.db, collectionName)) , (snapshot) => {
        snapshot.exists()? this.setProperty(collection, snapshot.data()) : null;
      }))
      
    this.db = getFirestore(firebaseimport);

    onSnapsFac( DBCollections );
    onAuthStateChanged(auth, (user) => {
      this.setProperty("user", user);
    })
    
  }

  subscribe(property, listener) {
    this.listeners[property].push(listener);
  }

  setStateProperty(property, value) {
    this.state[property] = value;
    this.listeners[property].forEach(listener => listener(this.state));
  }

  setLocalProperty(property, value) {
    this.localDb.set(property, value);
  }
  readLocalProperty(property) {
    return this.localDb.get(property);
  }
  setProperty(property, value) {
    this.setLocalProperty(property, value);
    this.setStateProperty(property, value);
  }
}

export default new Manager(auth.currentUser);
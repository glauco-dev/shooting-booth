import firebaseimport from "./firebaseimport";
import {
    getAuth,
    onAuthStateChanged,
  } from "firebase/auth";
  
import { onSnapshot, getFirestore, doc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';

const DBCollections = ["campeonatos", "membros", "squads", "pistas"];
export const auth = getAuth(firebaseimport);
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
    this.state = DBCollections.reduce((acc, cur) => ({ ...acc, [cur]: null }), baseState);
    this.listeners = DBCollections.reduce((acc, cur) => ({ ...acc, [cur]: [] }), baseListeners);
    const onSnapsFac = ( listOfCollections ) => 
      listOfCollections.map( collectionName => onSnapshot( query(collection(this.db, collectionName)) , 
      (snapshot) => {
        !snapshot.empty? this.setProperty(collectionName, snapshot.docs.map(doc => doc.data())) : null;
      }))
      
    this.db = getFirestore(firebaseimport);

    onSnapsFac( DBCollections );
    onAuthStateChanged(auth, async (user) => {
      let userFind = (await getDoc(doc(collection(this.db, "membros"), user.uid))).data();
      console.log(user, userFind)
      this.setProperty("user", {
        ... userFind,
        foto: await getDownloadURL(ref(getStorage(), userFind.foto))
      });
    })
    
  }

  subscribe(property, listener) {
    this.listeners[property].push(listener);
  }

  setStateProperty(property, value) {
    this.state[property] = value;
    this.listeners[property]?.forEach(listener => listener(value));
  }

  setProperty(property, value) {
    localStorage.setItem(property, JSON.stringify(value));
    this.setStateProperty(property, value);
  }

  logout() {
    auth.signOut();
    this.setProperty("user", null);
  }
}

export default new Manager(auth.currentUser);
import firebase from 'firebase'
import 'firebase/firestore'
import { GeoFirestore } from 'geofirestore';
import {config} from './apiConfig'
// firebase init goes here

firebase.initializeApp(config)

// firebase utils
const db = new GeoFirestore(firebase.firestore());
const geoPoint = firebase.firestore.GeoPoint

firebase.analytics();
//const auth = firebase.auth()
//const currentUser = auth.currentUser

export {
  db,
  geoPoint
}
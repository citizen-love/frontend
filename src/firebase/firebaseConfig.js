import firebase from 'firebase'
import 'firebase/firestore'
import {config} from './apiConfig'

// firebase init goes here
// firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
//const auth = firebase.auth()
//const currentUser = auth.currentUser

// firebase collections
const helpOffersCollection = db.collection('help_offers')
const helpRequestCollection = db.collection('help_requests')

export {
  db,
  //auth,
  //currentUser,
  helpOffersCollection,
  helpRequestCollection,
}
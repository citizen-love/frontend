import { db } from "../firebase/firebaseConfig";
import axios from "axios";

class User {
  collectionName = "users";
  unsubscribe = null;
  rootUrl = process.env.VUE_APP_API_URL;
  endpoint = "/users";

  constructor() {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async getAllUsers() {
    try {
      const collectionSnapshot = await db.collection(this.collectionName).get();
      console.log(collectionSnapshot);

      if (collectionSnapshot) {
        return collectionSnapshot.data();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllHelpers() {
    //todo
  }

  async createUser(payload) {
    console.log("creating user", payload);
    try {
      const { data } = await axios({
        method: "POST",
        url: this.rootUrl + this.endpoint,
        data: payload
      });
      console.log(data);
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateUser(payload) {
    console.log("updating user");
    try {
      const { data } = await axios({
        method: "PUT",
        url: this.rootUrl + this.endpoint,
        data: payload
      });
      console.log(data);
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getUser(userId) {
    try {
      const userSnapshot = await db
        .collection(this.collectionName)
        .doc(userId)
        .get();
      const user = userSnapshot.data();

      if (user) {
        return user;
      }
      return Promise.reject("notfound");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  subscribeRequests(callback) {
    this.unsubscribe = db.collection(this.collectionName).onSnapshot(snap => {
      snap.forEach(help => {
        const helpData = help.data();
        const helpId = help.id;
        callback({ id: helpId, data: helpData });
      });
    });
  }
}

export default new User();

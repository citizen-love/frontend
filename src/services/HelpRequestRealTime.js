import { db } from "../firebase/firebaseConfig";

class HelpRequestRealTime {
  collectionName = "help-requests";
  unsubscribe = null;

  constructor() {
    this.subscribeRequests = this.subscribeRequests.bind(this);
    this.unsubscribeRequests = this.unsubscribeRequests.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  }

  async getAllRequests() {
    let documents = [];
    try {
      const collectionSnapshot = await db.collection(this.collectionName).get();
      collectionSnapshot.forEach(doc => {
        documents.push({ id: doc.id, data: doc.data() });
      });
    } catch (e) {
      console.log(e);
      documents = [];
    }
    return documents;
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

  async unsubscribeRequests() {
    return this.unsubscribe();
  }
}

export default new HelpRequestRealTime();

import { db, geoPoint } from "../firebase/firebaseConfig";

class HelpRequestRealTime {
  collectionName = "help-requests";
  unsubscribe = null;

  constructor() {
    this.subscribeRequests = this.subscribeRequests.bind(this);
    this.unsubscribeRequests = this.unsubscribeRequests.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  }

  async getAllRequests({lat, lon}, limit = 50) {
    let documents = [];
    try {
      const collectionSnapshot = await db.collection(this.collectionName).near({
        center: new geoPoint(lat,lon),
        radius: 300
      }).limit(limit).get();
      collectionSnapshot.forEach(doc => {
        documents.push({ id: doc.id, data: doc.data() });
      });
      documents = documents.filter(help => help.data.status === "started" && help.data.counter < 6)
    } catch (e) {
      return Promise.reject(e)
    }
    return documents;
  }

  async getSingleRequest(helpRequestId) {
    try {
      const detailedRequestSnap = await db.collection(this.collectionName).doc(helpRequestId).get()
      const detailedRequest = detailedRequestSnap.data()

      if (detailedRequest) {
        return detailedRequest
      }
      return Promise.reject("notfound")
    } catch (e) {
      return Promise.reject(e)
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

  async unsubscribeRequests() {
    return this.unsubscribe();
  }
}

export default new HelpRequestRealTime();

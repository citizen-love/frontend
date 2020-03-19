import { helpRequestCollection} from "../firebase/firebaseConfig"

 class HelpRequestService {

  getHelpRequests() {
    return helpRequestCollection.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        return doc;
      });
    });
  }
}

export default new HelpRequestService();
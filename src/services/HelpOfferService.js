import axios from 'axios';

 class HelpOfferService {
   rootUrl = 'https://us-central1-citizen-love.cloudfunctions.net/api'
   endpoint = '/help-offer'

   constructor() {
    this.createHelpOffer = this.createHelpOffer.bind(this)
  }


  async createHelpOffer(helpRequestId, payload) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: this.rootUrl + this.endpoint + `/${helpRequestId}`,
        data: payload
      })
      return data
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default new HelpOfferService();
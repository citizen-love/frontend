import axios from 'axios';

 class HelpRequestService {
   rootUrl = 'https://us-central1-citizen-love.cloudfunctions.net/api'
   endpoint = '/help-request'

   constructor() {
     this.createHelpRequest = this.createHelpRequest.bind(this)
     this.getHelpRequestData = this.getHelpRequestData.bind(this)
     this.updateHelpRequest = this.updateHelpRequest.bind(this)
   }


  async createHelpRequest(payload) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: this.rootUrl + this.endpoint,
        data: payload
      })
      return data
    } catch (e) {
      console.error(e)
      return Promise.reject(e);
    }
  }

  async getHelpRequestData(token) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: this.rootUrl + this.endpoint + `/${token}`,
      })
      return data
    } catch (e) {
      console.err(e)
      return null;
    }

  }

  async updateHelpRequest(token, status) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: this.rootUrl + this.endpoint + `/${token}`,
        data: { status }
      })
      return data
    } catch (e) {
      console.err(e)
      return null;
    }
  }
}

export default new HelpRequestService();
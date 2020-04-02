import axios from 'axios';

 class HelpRequestService {
   rootUrl = process.env.API_URL;
   endpoint = '/help-request';

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
      return Promise.reject();
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
      return Promise.reject(e);
    }
  }
}

export default new HelpRequestService();
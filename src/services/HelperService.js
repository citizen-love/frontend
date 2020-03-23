import axios from 'axios';

class HelperService {
  rootUrl = 'https://us-central1-citizen-love.cloudfunctions.net/api'
  endpoint = '/subscribe'

  constructor() {
    this.registerHelper = this.registerHelper.bind(this)
  }

  async registerHelper(payload) {
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
}

export default new HelperService();
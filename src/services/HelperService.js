import axios from 'axios';

class HelperService {
  rootUrl = process.env.API_URL;
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
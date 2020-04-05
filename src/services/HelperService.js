import axios from "axios";

class HelperService {
  rootUrl = process.env.VUE_APP_API_URL;
  endpoint = "/subscribe";

  _MOCK_HELPER_UPDATE = {
    email: "john@smith.com",
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "+41 123 123",
    notifyBySMS: true,
    createdAt: "Apr 3 2020 12.32.44",
    isAvailable: true,
    bio:
      "I am a friendly primary school teacher willing to help everyone in need",
    categories: ["groceries", "pets", "childcare"],
    reviews: [
      {
        timestamp: "Apr 3 2020 12.32.44",
        rating: 5,
        feedback: "John was a very friendly volunteer, I can recommend.",
        categories: ["pets"]
      },
      {
        timestamp: "Apr 2 2020 12.32.44",
        rating: 5,
        feedback: "Very fast delivery",
        categories: ["groceries"]
      },
      {
        timestamp: "Apr 1 2020 12.32.44",
        rating: 2,
        feedback:
          "John got a long well with our older daughter but he struggled with our younger one.",
        categories: ["childcare"]
      }
    ],
    coordinates: { latitude: 52.258063, longitude: 20.963657 },
    radius: 30, //km
    language: "en",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" // change format if needed
  };

  // mock data starts
  _MOCK_HELPERS = [
    {
      email: "john@smith.com",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "+41 123 123",
      notifyBySMS: true,
      createdAt: "Apr 3 2020 12.32.44",
      isAvailable: true,
      bio:
        "I am a friendly primary school teacher willing to help everyone in need",
      categories: ["groceries", "pets", "childcare"],
      reviews: [
        {
          timestamp: "Apr 3 2020 12.32.44",
          rating: 5,
          feedback: "John was a very friendly volunteer, I can recommend.",
          categories: ["pets", "groceries"]
        },
        {
          timestamp: "Apr 2 2020 12.32.44",
          rating: 5,
          feedback: "Very fast delivery",
          categories: ["groceries"]
        },
        {
          timestamp: "Apr 1 2020 12.32.44",
          rating: 2,
          feedback:
            "John got a long well with our older daughter but he struggled with our younger one.",
          categories: ["childcare"]
        }
      ]
    },
    {
      email: "susan@meyer.com",
      firstName: "Susan",
      lastName: "Meyer",
      phoneNumber: "+41 123 123",
      notifyBySMS: true,
      createdAt: "Apr 3 2020 12.32.44",
      isAvailable: true,
      bio: "I love animals and willing to walk your dog anytime!",
      categories: ["pets"],
      reviews: [
        {
          timestamp: "Apr 3 2020 12.32.44",
          rating: 5,
          feedback: "Very good volunteer, highly recommend.",
          categories: ["pets"]
        }
      ],
      coordinates: { latitude: 51.258063, longitude: 20.963657 },
      radius: 10, //km
      language: "fr",
      avatar:
        "https://images.pexels.com/photos/1139793/pexels-photo-1139793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" // change format if needed
    },
    {
      email: "anna@hug.com",
      firstName: "Anna",
      lastName: "Hug",
      phoneNumber: "+41 223 123",
      notifyBySMS: false,
      createdAt: "Apr 3 2020 12.32.44",
      isAvailable: true,
      bio: "Friendly babysitter in your neighbourhood",
      categories: ["pets"],
      reviews: [
        {
          timestamp: "Apr 3 2020 12.32.44",
          rating: 3,
          feedback: "ok volunteer, was late.",
          categories: ["childcare"]
        }
      ],
      coordinates: { latitude: 51.258063, longitude: 20.963657 },
      radius: 10, //km
      language: "fr",
      avatar:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" // change format if needed
    },
    {
      email: "steven@st.com",
      firstName: "Steven",
      lastName: "Johnson",
      phoneNumber: "+41 223 123",
      notifyBySMS: false,
      createdAt: "Apr 3 2020 12.32.44",
      isAvailable: false,
      bio: "Professional personal trainer and Yoga instructor",
      categories: ["other"],
      reviews: [
        {
          timestamp: "Apr 3 2020 12.32.44",
          rating: 5,
          feedback: "excellent",
          categories: ["other"]
        },
        {
          timestamp: "Apr 3 2020 12.32.44",
          rating: 5,
          feedback: "Very motivating coach",
          categories: ["other"]
        }
      ],
      coordinates: { latitude: 51.258063, longitude: 20.963657 },
      radius: 30, //km
      language: "fr",
      avatar:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" // change format if needed
    }
  ];

  // mock data ends

  constructor() {
    this.createHelper = this.registerHelper.bind(this);
    this.registerHelper = this.registerHelper.bind(this);
    this.getAllHelpers = this.getAllHelpers.bind(this);
    this.getHelper = this.getHelper.bind(this);
    this.updateHelper = this.updateHelper.bind(this);
  }

  // @TODO: connect to backend and test
  async createHelper(payload) {
    console.log("registering new user in HelperService", payload);
    return this.getHelper();

    /*try {
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
    */
  }

  async registerHelper(payload) {
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

  // @TODO: connect to backend and test
  async updateHelper(payload) {
    try {
      console.log("updating helper data", payload);
      console.log("returning mock data", this._MOCK_HELPER_UPDATE);
      return this._MOCK_HELPER_UPDATE;
      /*const { data } = await axios({
        method: 'GET',
        url: this.rootUrl + this.endpoint,
        data: payload
      })
      return data*/
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // @TODO: connect to backend and test
  async getAllHelpers(currentCoordinates, radius) {
    console.log(
      "looking for helpers within " +
        radius +
        " kilometers from" +
        currentCoordinates
    );
    return this._MOCK_HELPERS;
  }

  // @TODO: connect to backend and test
  async getHelper(userId) {
    try {
      console.log(
        "fetching helper data for ID" + userId,
        this._MOCK_HELPERS[0]
      );
      return this._MOCK_HELPERS[0];
      /*const { data } = await axios({
        method: 'GET',
        url: this.rootUrl + this.endpoint,
        data: payload
      })
      return data*/
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default new HelperService();

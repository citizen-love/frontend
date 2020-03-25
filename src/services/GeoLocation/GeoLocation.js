class GeoLocationService {
  rootUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  API_KEY = "AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk";
  coordinates = {
    lat: "",
    lon: ""
  };

  constructor() {
    this.getIpAddress = this.getIpAddress.bind(this);
    this.getReverseLocation = this.getReverseLocation.bind(this);
  }
  async getIpAddress() {
    try {
      const locationDetails = await fetch("https://blip.runway7.net");
      const locationResult = await locationDetails.json();
      this.coordinates.lat = locationResult.lat;
      this.coordinates.lon = locationResult.lon;
      return locationResult;
    } catch (e) {
      return;
    }
  }
  async getReverseLocation() {
    try {
      const places = await fetch(
        `${this.rootUrl}?latlng=${this.coordinates.lat},${this.coordinates.lon}&key=${this.API_KEY}`
      );
      const placeJson = await places.json()
      const { formatted_address: fullAddress } = placeJson.results[0]
      return fullAddress;
    } catch (e) {
      return "";
    }
  }
}

export default new GeoLocationService();

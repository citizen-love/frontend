class GeoLocationService {
  getCoordinates(callback) {
    function success(data) {
      const { latitude, longitude } = data.coords;
      callback({ latitude, longitude });
    }

    function error() {
      return;
    }
    if (navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    return;
  }
  async getIpAddress() {
    try {
      const locationDetails = await fetch("https://blip.runway7.net")
      return locationDetails.json()
    } catch (e) {
      return;
    }
  }
}

export default new GeoLocationService();

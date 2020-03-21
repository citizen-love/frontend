class GeoLocationService {
  getCoordinates(callback) {
    function success(data) {
      const { latitude, longitude } = data.coords;
      callback({ latitude, longitude });
    }

    function error(err) {
      console.log(err);
      return;
    }
    if (navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    console.log("navigator not available");
    return;
  }
}

export default new GeoLocationService();

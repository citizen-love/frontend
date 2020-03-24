 class MapSnapshot {
   rootUrl = 'https://maps.googleapis.com/maps/api/staticmap'
   API_KEY = 'AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk'

   constructor() {
    this.getStaticUrl = this.getStaticUrl.bind(this)
  }

  getStaticUrl({ lat, lon}, zoom, dimensions){
      return `${this.rootUrl}?center=${lat},${lon}&zoom=${zoom}&size=${dimensions}&key=${this.API_KEY}`;
  }
}

export default new MapSnapshot();
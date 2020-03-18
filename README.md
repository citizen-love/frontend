# Citizen.Love ❤
helping each other made easy

#About this project
This project aims to provide an easy way for help seeking people to find people that can help in a geo area, especially 
during the corona virus crisis. 

#How to contribute

Read the project document (https://contribute.citizen.love) to get a brief overview on the whole project.

Make sure to:
* leave your contact details in the project document ((https://contribute.citizen.love)
* let Manuel (https://telegram.me/m_frick) know that you want to contribute

After that: Hit the keys and create the awesomeness!

## Getting started
To get out an MVP asap, we use the following tools:
* Vue.js (easy to learn Javascript component framework)
  * If you're new to Vue.js, read through the introduction to learn about the concept.  (https://vuejs.org/v2/guide/index.html)
* Vuetify (Material design components for Vue.js)
  * To not loose time with creating our own design, we just use the Vue.js implementation of Material Design. The library
  is very extensive. Check out https://vuetifyjs.com/en/getting-started/
* Firebase Firestore (to be able to save data to the cloud in no time)
  * Firebase is a collection of "backend-tools" by Goole which support rapid protoype development. So far we use Firestore to store our data.
  Firestore is a NoSQL-Database where you can essentially save and read json-Objects. Read more here: https://firebase.google.com/docs/firestore
* Firebase Cloud Functions (to have some backend logic)
  * Cloud functions are serverless functions. We'll use some of them to apply some backend logic. Read more here: https://firebase.google.com/docs/functions
* Weblate (to translate our app so that it can spread across the globe)
  * Together with the plugin vue-i18n webalte helps us internationalize the webapp. Check it out here: https://kazupon.github.io/vue-i18n/introduction.html
  
## Project Setup
When you cloned the repo, setup your project running:
```
npm install
```
To spin up a local web browser with hot-reloading to see what your beautiful work looks like, hit:

**Note**: You need the API secrets to talk to the database.
```
npm run serve
```
## Code structure

* `src/assets` is the place to put all assets like images, documents, etc.
* `src/components` is the place to put all vue components that are not specific to only one view/screen
* `src/firebase` hosts the api credentials and the setup to speak to firebase
* `src/locales` hosts all translations. Please only edit `en.json`, because the other files are managed by *weblate*
* `src/plugins` hosts misc plugin configuration scripts, currently the theming for vuetify and vue-i18n
* `src/router` hosts the route config for this app. If you add a view, add the route in `index.js`
* `src/services` hosts the service / data access classes to e.g. speak to firebase in a simplified way
* `src/store` hosts the config for vuex, the Vue.js state management
* `src/views` hosts the screen respective their Vue.js components
* `src/App.vue` is the root Vue.js component
* `src/main.js` is the init script where all the magic starts
  
## Internationalization
Never hardcode copy text in the app! Copy text is reference by vue-i18n with a key path, with the texts being located in json files.

If you add text, do the following:

1. Add your key/ copy text to the file `src/locales/en.json` 
   * English is the reference language, so add your copy in english only. It will be automatically synced to the translation management system *weblate*.
   * Nest your keys to group them, e.g. `startpage.intro.headline`
2. Reference this key in the code
   * in the html code / template code: `{{ $t('my.key) }}`  
   * in javascript (you need to have a reference to a component) `this.$i18n.$t('my.key)` 
   (`this` references the current vue component)
   
## Database access
You need to copy the file `src/firebase/apiConfig.template.js` to  `src/firebase/apiConfig.js` and add the API 
credentials there.  

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Helpful links
* Vue.js intro: https://vuejs.org/v2/guide/index.html
* Material Design for Vue.js: https://vuetifyjs.com/de-DE/
* https://vuetifyjs.com/en/getting-started/
* Firebase + Vue.js tutorial: https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase
* Vuetifiy-Presentation: https://docs.google.com/presentation/d/13dt0RmiQyulnLcfkj7OokLDG3Oe-R1SXkwwNZ6SmZYU/edit#slide=id.p

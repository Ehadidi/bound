import Vue from 'vue';
import VueGoogleMaps from 'vue3-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbj-lMU2tI-ZUC0_Pi6iahLi_rO0lOk5E',
    libraries: 'places',
  },
});
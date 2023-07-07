import "regenerator-runtime";
import Vue from "vue";
import App from "./App.vue";
import Notifications from 'vue-notification'
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

Vue.use(Notifications);

const app = new Vue({
    store,
    render: h => h(App),
});

app.$mount('#editor-mail-live')

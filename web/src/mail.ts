import "regenerator-runtime";
import Vue from "vue";
import App from "./App.vue";

Vue.prototype.$eventBus = new Vue();

const app = new Vue({
    render: h => h(App),
});

app.$mount('#app-mail')

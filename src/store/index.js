import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import notificationMessage from "./modules/notificationMessage";

import layout from "./layout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    login,
    notificationMessage
  }
});

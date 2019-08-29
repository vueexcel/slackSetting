import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import tmsSetting from "./modules/tmsSetting";
import setting from "./modules/setting";

import layout from "./layout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    login,
    tmsSetting,
    setting
  }
});

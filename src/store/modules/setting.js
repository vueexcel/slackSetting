import axios from "../axios";
import { make } from "vuex-pathify";
import router from "../../Routes";

const state = {};
const mutations = make.mutations(state);
const actions = {
  async allsettings() {
    let res = await axios.get("/slack/settings");
    return res;
  },
  async setallsettings({ state, commit }, payload) {
    let res = await axios.put("/slack/settings", payload);
    return res;
  }
};

// create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

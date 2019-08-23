// https://still-plains-80981.herokuapp.com/tms/schduler_mesg
// https://still-plains-80981.herokuapp.com/tms/schdulers_settings
// https://still-plains-80981.herokuapp.com/tms/tms_settings
import axios from "../axios";
import { make } from "vuex-pathify";
import router from "./../../Routes";

const state = {
  authenticated: null,
  isLoggedIn: false,
  sidebar: true
};
const mutations = make.mutations(state);
const actions = {
  async slackSettings() {
    let res = await axios.get("/tms/tms_settings");
    return res;
  },
  async setSlackSettings({ state, commit }, payload) {
    let res = await axios.put("/tms/tms_settings", payload);
    return res;
  },

  async schedularSettings() {
    let res = await axios.get("/tms/schdulers_settings");
    return res;
  },
  async setSchedularSettings({ state, commit }, payload) {
    let res = await axios.put("/tms/schdulers_settings", payload);
    return res;
  },

  async schedularMsg() {
    let res = await axios.get("/tms/schduler_mesg");
    return res;
  },
  async setSchedularMsg({ state, commit }, payload) {
    let res = await axios.put("/tms/schduler_mesg", payload);
    return res;
  },
  async removeDisabledUser({ state, commit }, payload) {
    let res = await axios.delete("/tms/remove_disable_user", payload);
    return res;
  },
  async removePreviousCheckin({ state, commit }, payload) {
    let res = await axios.delete("/tms/remove_previous_checkin", payload);
    return res;
  },
  // @bp.route('/slack_mesg', methods=["GET"])
  async slackMessage() {
    let res = await axios.get("/tms/slack_mesg");
    return res;
  },
  // https://still-plains-80981.herokuapp.com/tms/slack
  async getSlackChannels() {
    let res = await axios.get("/tms/slack");
    return res;
  },
  // https://still-plains-80981.herokuapp.com/tms/slack_mesg
  async updateSlackChannels({ state, commit }, payload) {
    let res = await axios.put("/tms/slack_mesg", payload);
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

import axios from "../axios";
import { make } from "vuex-pathify";
import router from "../../Routes";

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

  // async schedularSettings() {
  //   let res = await axios.get("/tms/schdulers_settings");
  //   return res;
  // },
  // async setSchedularSettings({ state, commit }, payload) {
  //   let res = await axios.put("/tms/schdulers_settings", payload);
  //   return res;
  // },

  // async schedularMsg() {
  //   let res = await axios.get("/tms/schduler_mesg");
  //   return res;
  // },
  // async setSchedularMsg({ state, commit }, payload) {
  //   let res = await axios.put("/tms/schduler_mesg", payload);
  //   return res;
  // },
  async removeDisabledUser({ state, commit }, payload) {
    let res = await axios.delete("/tms/remove_disable_user", payload);
    return res;
  },
  async removePreviousCheckin({ state, commit }, payload) {
    let res = await axios.delete("/tms/remove_previous_checkin", payload);
    return res;
  },
  async slackMessage({ state, commit }, payload) {
    let response = {
      error: false,
      res: null
    };
    try {
      let res = await axios.get(`/message/configuration/${payload}`);
      response.res = res.data;
      return response;
    } catch (error) {
      response.error = true;
      return response;
    }
  },
  async getSlackChannels() {
    try {
      let res = await axios.get("/slackchannels");
      return res;
    } catch (error) {}
  },
  async updateSlackChannels({ state, commit }, payload) {
    let res = await axios.put(
      `/message/configuration/${payload.message_origin}`,
      payload
    );
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

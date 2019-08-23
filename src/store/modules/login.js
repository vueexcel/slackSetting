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
  ...make.actions(state),
  async userLogin({ state, commit }, payload) {
    try {
      let response = await axios.post("/auth/login", payload);
      state.authenticated = response.data.access_token;
      state.isLoggedIn = true;
      // commit("authenticated", response.data.access_token);
      // commit("isLoggedIn", true);
      window.localStorage.setItem("authenticated", response.data.access_token);
      return true;
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        // commit("isLoggedIn", false);
        state.isLoggedIn = false;
        return err.response.data.msg;
      } else {
        // commit("isLoggedIn", false);
        state.isLoggedIn = false;
        return "Something went wrong!";
      }
    }
  }
};

// create store
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

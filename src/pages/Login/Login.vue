<template>
  <div class="login-page">
    <b-container class="pt-1 pb-1 bg-white shadow-sm col-md-6 col-11">
      <Widget class="mx-auto" customHeader>
        <h5 class="logo mb-5">
          <img :src="logo" width="100%" alt="logo" />
        </h5>
        <h6 class="mt-0 mb-5 text-center font-weight-bold">
          <i class="fa fa-slack" /> Slack Setting
        </h6>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">{{errorMessage}}</b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="username"
              required
              type="text"
              name="username"
              placeholder="Username"
              autofocus
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="password"
              required
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <b-button type="submit" variant="inverse" class="w-100">
                <span class="d-block pl-3 pr-3" v-if="loading">
                  <i class="fa fa-circle-o-notch fa-spin" />
                </span>
                <span v-else>Login</span>
              </b-button>
            </div>
          </div>
        </form>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import logo from "../../assets/images/logo.png";
import { call, get } from "vuex-pathify";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      loading: false,
      logo
    };
  },
  computed: {
    isLoggedIn: get("login/isLoggedIn")
  },
  methods: {
    api_login: call("login/userLogin"),
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;
      if (username && password) {
        this.loading = true;
        this.api_login({ username: username, password: password })
          .then(res => {
            console.log(res);
            if (res) {
              this.$router.push("/app/tms");
            }
          })
          .catch(err => {
            console.log(err);
            this.toast();
          });
      } else {
        this.toast();
      }
    },
    toast() {
      this.$bvToast.toast(
        `Wrong Credentials. Please check your username, password and try again.`,
        {
          title: `woah!`,
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
          appendToast: false
        }
      );
    }
  },
  mounted() {
    // if (window.localStorage.getItem("authenticated") === "true") {
    if (this.isLoggedIn === true) {
      this.$router.push("/app/tms");
    }
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped />

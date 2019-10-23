<template>
  <router-view />
</template>

<script>
import { get } from "vuex-pathify";
import { validateToken } from "@/components/Mixins/validateToken";
export default {
  name: "App",
  mixins: [validateToken],
  computed: {
    isLoggedIn: get("login/isLoggedIn")
  },
  created() {
    const currentPath = this.$router.history.current.path;

    // if (window.localStorage.getItem("authenticated") === "false") {
    // if (!this.validateJwt()) {
    // if (currentPath === "/login") {
    //   return;
    // }
    // this.$router.push("/login");
    // } else {
    if (currentPath === "/" || currentPath === "/app") {
      // this.$router.push("/app/main/analytics");
      this.$router.push("/app/notificationMessages");
    }
    // }
  }
};
</script>

<style src="./styles/theme.scss" lang="scss" />

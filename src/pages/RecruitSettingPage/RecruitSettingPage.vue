<template>
  <div>
    <h1>Recruit Settings</h1>
    <Widget customHeader v-for="( mail, index ) in email" :key="index">
      <div class="pl-1 mb-5 bg-white mt-3 pt-2">
        <div v-html="mail.body"></div>
      </div>
    </Widget>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import emailTemplate from "./emailTemplate.json";
export default {
  name: "recruitSettingPage",
  components: {
    Widget
  },
  data() {
    return {
      message: "",
      key: 0,
      email: emailTemplate
    };
  }
};
</script>

<style>
</style>
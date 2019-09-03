<template>
  <div>
    <h1>HR Setting</h1>
    <b-dropdown text="Select Template" variant="outline-success" class="m-2">
      <b-dropdown-item
        v-for="( mail, index ) in emailArray"
        :key="index"
        @click="selectTemplate(mail,index)"
      >{{mail.name}}</b-dropdown-item>
    </b-dropdown>
    <EmailComp :mail="selected" :variables="variables"></EmailComp>
  </div>
</template>

<script>
import EmailComp from "@/components/Email/email";
import emailTemplateForHr from "./emailTemplate.json";
import variables from "./template_variables.json";

import Vue from "vue";

export default {
  components: {
    EmailComp
  },
  data() {
    return {
      emailArray: emailTemplateForHr,
      variables: variables,
      selected: null
    };
  },
  methods: {
    selectTemplate(mail, index) {
      this.selected = mail;
    }
  }
};
</script>

<style>
</style>
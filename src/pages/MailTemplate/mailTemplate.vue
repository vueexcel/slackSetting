<template>
  <div>
    <h1>Mail Template</h1>
    <b-list-group horizontal="lg">
      <b-list-group-item
        class="border cursor"
        v-for="( mail, index ) in emailArray"
        :class="{'active' : mail == selected}"
        :key="index"
        @click="selectTemplate(mail,index)"
      >{{mail.name}}</b-list-group-item>
    </b-list-group>
    <EmailComp :mail="selected" :variables="variables" @messageBody="onClick"></EmailComp>
    <Confirm :tags="tags" @tags="confirmedTags" />
    <SendMail />
  </div>
</template>

<script>
import EmailComp from "@/components/Email/email";
import Confirm from "./confirm";
import SendMail from "./sendMail";
import emailTemplateForHr from "./emailTemplate.json";
import variables from "./template_variables.json";

import Vue from "vue";

export default {
  components: {
    EmailComp,
    Confirm,
    SendMail
  },
  data() {
    return {
      emailArray: emailTemplateForHr,
      variables: variables,
      selected: null,
      tags: []
    };
  },
  mounted() {
    if (this.emailArray.length) {
      this.selected = this.emailArray[0];
    }
  },
  methods: {
    selectTemplate(mail, index) {
      this.selected = mail;
    },
    onClick(val) {
      this.tags = val.match(/#[a-z_]+/gi);
      this.$bvModal.show("confirm");
    },
    confirmedTags(val) {
      console.log(val);
      this.$bvModal.show("modal-multi-3");
    }
  }
};
</script>

<style src="./hrSetting.scss" lang="scss" scoped/>
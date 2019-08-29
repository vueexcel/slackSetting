<template>
  <div>
    <h1>TMS Settings</h1>
    <div v-if="allMessage">
      <b-row class="justify-content-md-center" v-for="(msg , key) in allMessage" :key="key">
        <b-col>
          <!-- <Widget customHeader> -->
          <!-- :style="{ borderLeft: '4px solid ' + msg.message_color ? msg.message_color : '#0375D8' }" -->
          <div class="pl-1 mb-5 bg-white mt-3 pt-2" style="borderLeft: 4px solid #0375D8">
            <span v-if="!msg.edit" class="font-weight-bold px-2">{{ msg.message }} <b-badge variant="primary" class="ml-3" pill>{{msg.message_type}}</b-badge></span> 
            <span v-if="msg.edit">
              <input
                class="form-control"
                type="text"
                :ref="'textval' + key"
                @select="noSelect($event,key)"
                @keydown="textedit($event,key)"
                @keypress="textedit($event,key)"
                @keypress.enter="updateMessage(msg,key), msg.edit = !msg.edit"
                v-model="msg.message"
              />
            </span>
            <span class="d-flex m-1 px-2">
              <a @click="msg.edit = !msg.edit" class="font-weight-bold">
                <span v-if="!msg.edit" class="text-primary">Edit</span>
                <span v-else class="text-danger">Cancel</span>
              </a>
            </span>
            <div class="mt-4 px-2" v-if="msg.slackChannelsArray">
              <b-row align-v="center">
                <b-col cols="10" class="d-flex">
                  <span for="email">
                    <i class="font-weight-bold">Slack Channels</i>
                  </span>
                  <b-form-checkbox switch class="ml-2">On</b-form-checkbox>
                </b-col>
                <b-col cols="2">
                  <b-button variant="primary" class="float-right" pill>Test</b-button>
                </b-col>
              </b-row>
              <!-- <label for="slack">
                    <i>Slack Channels</i>
              </label>-->
              <hr class="mt-1 mb-1" />
              <b-form-group id="slack">
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selectedSlackChannel[key]"
                  name="flavour-1"
                >
                  <b-form-checkbox
                    :value="channel.value"
                    v-for="(channel,index) in msg.slackChannelsArray"
                    :key="index"
                  >{{channel.text}}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>

            <!-- *
            ****** EMAIL-->

            <Email :index="key" @emailArray="emailArrayToget"></Email>

            <!-- *
            ****** Mobile Message-->
            <!-- <Mobile :index="key" @mobileArray="mobileArrayToget"></Mobile> -->
          </div>
          <!-- </Widget> -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import SlackChannels from "@/components/SlackChannels/SlackChannels";
import Email from "./email/email.vue";
// import Mobile from "./MobileMessage/mobileMessage.vue"
import { call } from "vuex-pathify";
import Vue from "vue";
export default {
  components: {
    Widget,
    SlackChannels,
    Email
    // Mobile
  },
  created() {
    // this.getSlackSettings();
    // this.getSchedularMsg();
    this.getSlackMessage();
    this.fetchSlackChannels();
  },
  data() {
    return {
      tag: "",
      tags: [],
      mobileTags: [],
      edit: false,
      loadingSlackToken: false,
      slackTokens: {
        webhook_url: "",
        slack_token: "",
        secret_key: ""
      },
      // color select
      selectedColor: null,
      colorOptions: [
        { value: null, text: "Please select an option" },
        { value: "red", text: "Red" },
        { value: "blue", text: "Blue" },
        { value: "green", text: "Green" },
        { value: "purple", text: "Purple" }
      ],
      // cetegory select
      selectedCategory: null,
      categoryOptions: [
        { value: null, text: "Please select an option" },
        { value: "simple", text: "Simple" },
        { value: "button", text: "Button" }
      ],
      allMessage: [],
      // slackChannel select
      selectedSlackChannel: [],
      slackChannels: [],
      loading: []
      // searchField: ""
    };
  },
  computed: {
    searchFilter: function() {
      if (this.slackChannels) {
        return this.slackChannels.filter(item => {
          if (item.text) {
            return item.text
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        });
      }
    }
  },
  methods: {
    api_getSlackSettings: call("tmsSetting/slackSettings"),
    api_setSlackSettings: call("tmsSetting/setSlackSettings"),
    // api_getSchedularMsg: call("tmsSetting/schedularMsg"),
    // api_setSchedularMsg: call("tmsSetting/setSchedularMsg"),
    api_slackMessage: call("tmsSetting/slackMessage"),
    api_getSlackChannels: call("tmsSetting/getSlackChannels"),
    api_updateSlackChannels: call("tmsSetting/updateSlackChannels"),
    getSlackSettings() {
      this.api_getSlackSettings()
        .then(res => {
          this.slackTokens.webhook_url = res.data[0].webhook_url;
          this.slackTokens.slack_token = res.data[0].slack_token;
          this.slackTokens.secret_key = res.data[0].secret_key;
        })
        .catch(err => console.log(err));
    },
    setSlackSettings() {
      this.loadingSlackToken = true;
      this.api_setSlackSettings(this.slackTokens)
        .then(res => {
          this.loadingSlackToken = false;
        })
        .catch(err => {
          console.log(err);
          this.loadingSlackToken = false;
        });
    },
    textedit(event, i) {
      if (event.key === "Delete") {
        event.preventDefault();
      }
      let a = this.$refs["textval" + i][0].value
        .substring(0, this.$refs["textval" + i][0].selectionStart)
        .split("")
        .reverse()
        .join("");
      let x = a.indexOf(" ");
      let y = a.indexOf("@");
      let z;
      if (x == 0) {
        z = a.substr(1).indexOf(" ");
      }
      if (
        (x == -1 || (x > y || (x == 0 && (z >= y || z === -1)))) &&
        (event.key === "Backspace" ||
          event.key === "Delete" ||
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 65 && event.keyCode <= 90) ||
          event.keyCode == 32 ||
          (event.keyCode >= 97 && event.keyCode <= 122))
      ) {
        event.preventDefault();
      }
    },
    noSelect(event, i) {
      this.$refs["textval" + i][0].selectionStart = this.$refs[
        "textval" + i
      ][0].selectionEnd;
    },
    async getSlackMessage() {
      this.allMessage = [];
      this.api_slackMessage()
        .then(res => {
          if (res.res && res.res.length) {
            res.res.forEach((element, index) => {
              element.edit = false;
              this.allMessage.push(element);
              if (element.slack_channel && element.slack_channel.length) {
                this.selectedSlackChannel[index] = element.slack_channel;
              }
            });
            this.$nextTick(() => {
              this.$forceUpdate();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchSlackChannels() {
      this.slackChannels = [];
      await this.api_getSlackChannels()
        .then(res => {
          for (var key in res.data) {
            if (key === "Private_channel") {
              this.allMessage.map(message => {
                if (message.channel === "private") {
                  message["slackChannelsArray"] = res.data[key];
                  this.$forceUpdate();
                }
              });
            } else {
              this.allMessage.map(message => {
                if (message.channel === "public") {
                  message["slackChannelsArray"] = res.data[key];
                  this.$forceUpdate();
                }
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateMessage(msg, key) {
      this.$set(this.loading, key, true);
      for (var k in this.selectedSlackChannel) {
        console.log(msg, k, "==");
        if (k == key) {
          var slackChannels = this.selectedSlackChannel[k];
        }
      }
      msg.slack_channel = slackChannels;
      this.api_updateSlackChannels(msg)
        .then(res => {
          this.$set(this.loading, key, false);
        })
        .catch(err => {
          console.log(err);
          this.$set(this.loading, key, false);
        });
    },
    emailArrayToget(value) {
      this.tags[value.index] = value.email;
    },
    mobileArrayToget(value) {
      Vue.set(this.mobileTags, value.index, value.number);
    }
  }
};
</script>

<style src="./TmsSettings.scss" lang="scss" />

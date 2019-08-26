<template>
  <div>
    <h1>TMS Settings</h1>
    <b-row class="justify-content-md-center">
      <b-col md="10">
        <!-- <Widget customHeader> -->
          <div
            class="pl-1 mb-5 bg-white mt-3"
            v-for="(msg , key) in allMessage"
            :key="key"
            :style="{ borderLeft: '4px solid ' + msg.message_color }"
          >
            <span v-if="!msg.edit">{{ msg.message }}</span>
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
            <!-- {{index}} -->
            <span class="d-flex m-1 text-primary">
              <a @click="msg.edit = !msg.edit">
                <span v-if="!msg.edit">Edit</span>
                <span v-else>Cancel</span>
              </a>
            </span>
            <div class="mt-4" v-if="msg.message_type === 'complex_message'">
              <label for="slack"><i>Slack Channels</i></label>
              <hr class="mt-1 mb-1">
              <b-form-group id="slack">
                <!-- <b-form-input
                  @keypress.esc="searchField = ''"
                  type="search"
                  class="w-25"
                  v-model="searchField"
                  name="search"
                  placeholder="Search"
                ></b-form-input> -->

                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selectedSlackChannel[key]"
                  name="flavour-1"
                >
                  <!-- v-for="(channel,index) in slackChannels" -->
                  <!-- @input="updateMessage( msg,key )" -->



                  <b-form-checkbox
                    :value="channel.value"
                    v-for="(channel,index) in msg.slackChannelsArray"
                    :key="index"
                  >{{channel.text}}</b-form-checkbox>
                
                </b-form-checkbox-group>
              </b-form-group>
              <!-- <SlackChannels
                :unikey="key"
                :selectedSlackChannel="selectedSlackChannel"
                :slackChannels="slackChannels"
              /> -->
            </div>
            <div class="mt-2">
              <b-button variant="primary" @click="updateMessage( msg,key )">
                <span class="d-block pl-3 pr-3" v-if="loading[key]===true">
                  <i class="fa fa-circle-o-notch fa-spin" />
                </span>
                <span v-else>Update</span>
              </b-button>
            </div>
          </div>
        <!-- </Widget> -->
      </b-col>
      <b-col md="2">
        <b-button variant="primary">Test</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import SlackChannels from "@/components/SlackChannels/SlackChannels";
import { call } from "vuex-pathify";
export default {
  components: {
    Widget,
    SlackChannels
  },
  created() {
    // this.getSlackSettings();
    // this.getSchedularSettings();
    // this.getSchedularMsg();
    this.getSlackMessage();
    this.fetchSlackChannels();
  },
  data() {
    return {
      edit: false,
      textmessage:
        "Lorem @ipsum dolor sit amet, @consectetur adipisicing elit. Dicta architecto molestias adipisci, excepturi vel dignissimos a, doloribus beatae suscipit cum optio voluptate? @Sed, deleniti voluptate? Qui esse iusto eaque amet.",
      loadingSlackToken: false,
      loadingReminderMessage: false,
      loaderSchedularSettings: false,
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
    // api_getSchedularSettings: call("tmsSetting/schedularSettings"),
    // api_setSchedularSettings: call("tmsSetting/setSchedularSettings"),
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
    getSlackMessage() {
      this.allMessage = [];
      this.api_slackMessage()
        .then(res => {
          res.res.forEach((element, index) => {
            element.edit = false;
            this.allMessage.push(element);
            if (element.slack_channel.length) {
              this.selectedSlackChannel[index] = element.slack_channel;
            }
          });
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
            if(key === 'Private_channel'){
              this.allMessage.map(message => {
                if(message.channel === 'private'){
                  message['slackChannelsArray'] = res.data[key] 
                }
              })
            } else {
              this.allMessage.map(message => {
                if(message.channel === 'public'){
                  message['slackChannelsArray'] = res.data[key] 
                }
              })
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
        console.log(msg, k, "=============================");
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
    }
  }
};
</script>

<style src="./TmsSettings.scss" lang="scss" />

<template>
  <div class="forms-elements">
    <h1>Settings</h1>
    <br />

    <b-row class="mt-3">
      <b-col>
        <h4>Slack Notification</h4>
      </b-col>
      <b-col>
        <b-form>
          <b-form-group class="display-inline-block checkbox-ios">
            <label for="checkbox-ios2" class="switch form-control-label">
              <input
                type="checkbox"
                id="checkbox-ios2"
                class="ios form-check-input"
                value="on"
                checked
              />
              <i></i>
            </label>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col md="12">
        <Widget>
          <b-form-group>
            <b-form @submit.prevent="setSlackSettings()">
              <legend>
                <strong>Slack</strong> tokens
              </legend>
              <b-form-group
                horizontal
                label-for="normal-field"
                label-class="text-md-right"
                :label-cols="2"
                breakpoint="md"
              >
                <div slot="label">Slack token</div>
                <b-form-input
                  type="text"
                  v-model="slackTokens.slack_token"
                  id="label-hint"
                  required
                />
              </b-form-group>
              <b-form-group
                horizontal
                label
                label-for="transparent-field"
                :label-cols="2"
                breakpoint="md"
              >
                <b-button variant="primary" type="submit" class="mr-xs w-28">
                  <span v-if="loadingSlackToken">
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                  </span>
                  <span v-else>Save Changes</span>
                </b-button>
              </b-form-group>
            </b-form>
          </b-form-group>
        </Widget>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <h4>Email Setting</h4>
      </b-col>
      <b-col>
        <b-form>
          <b-form-group class="display-inline-block checkbox-ios">
            <label for="checkbox-ios2" class="switch form-control-label">
              <input
                type="checkbox"
                id="checkbox-ios2"
                class="ios form-check-input"
                value="on"
                checked
              />
              <i></i>
            </label>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <h4>Mobile Message</h4>
      </b-col>
      <b-col>
        <b-form>
          <b-form-group class="display-inline-block checkbox-ios">
            <label for="checkbox-ios2" class="switch form-control-label">
              <input
                type="checkbox"
                id="checkbox-ios2"
                class="ios form-check-input"
                value="on"
                checked
              />
              <i></i>
            </label>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import DatePicker from "vue2-datepicker";
import { bFormSlider } from "vue-bootstrap-slider";
import vueDropzone from "vue2-dropzone";
import { Chrome } from "vue-color";
import Widget from "@/components/Widget/Widget";

import { call } from "vuex-pathify";

export default {
  name: "FormElements",
  components: {
    Widget,
    vSelect,
    DatePicker,
    bFormSlider,
    vueDropzone,
    Chrome
  },
  data() {
    return {
      isPickerActive: false,
      allMessage: [],
      slackTokens: {
        webhook_url: "",
        slack_token: "",
        secret_key: ""
      }
    };
  },
  mounted() {
    this.callApi();
  },
  methods: {
    callApi() {
    }
  }
};
</script>

<style src="../Forms/Elements/Elements.scss" lang="scss" />

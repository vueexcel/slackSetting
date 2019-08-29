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
                v-model="form.slack_notfication"
                id="checkbox-ios2"
                class="ios form-check-input"
                value="on"
                @change="setSettings('check-box')"
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
            <b-form @submit.prevent>
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
                  @keypress.13="setSettings('save-btn')"
                  v-model="form.slack_token"
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
              ></b-form-group>
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
            <label for="checkbox-ios3" class="switch form-control-label">
              <input
                type="checkbox"
                id="checkbox-ios3"
                class="ios form-check-input"
                value="on"
                v-model="form.send_email"
                @change="setSettings('check-box')"
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
            <label for="checkbox-ios4" class="switch form-control-label">
              <input
                type="checkbox"
                id="checkbox-ios4"
                class="ios form-check-input"
                value="on"
                v-model="form.mobile_message"
                @change="setSettings('check-box')"
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
import Widget from "@/components/Widget/Widget";
import { call } from "vuex-pathify";

export default {
  name: "setting",
  components: {
    Widget
  },
  data() {
    return {
      form: {
        mobile_message: false,
        send_email: false,
        slack_notfication: false,
        slack_token: ""
      }
    };
  },
  created() {
    this.fetchSetting();
  },
  methods: {
    api_allsettings: call("setting/allsettings"),
    api_setallsettings: call("setting/setallsettings"),
    fetchSetting() {
      this.api_allsettings()
        .then(res => {
          if (res.status === 200) {
            (this.form.mobile_message = res.data.mobile_message),
              (this.form.send_email = res.data.send_email),
              (this.form.slack_notfication = res.data.slack_notfication),
              (this.form.slack_token = res.data.slack_token);
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    setSettings(val) {
      if (val === "save-btn") {
      }
      this.api_setallsettings(this.form)
        .then(res => {
          this.$bvToast.toast("Changes has been updated", {
            title: "OK!",
            variant: "success",
            solid: true
          });
        })
        .catch(err => {
          this.$bvToast.toast("something went wrong!", {
            title: "uh oh!",
            variant: "danger",
            solid: true
          });
        });
    }
  }
};
</script>

<style src="../Forms/Elements/Elements.scss" lang="scss" />

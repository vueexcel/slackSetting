<template>
  <div>
    <b-modal id="modal-multi-3" size="sm" title="Third Modal" ok-only>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-none">Send To:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="sendTo" placeholder="Email"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-none">Bcc:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="bcc" placeholder="Email"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-none">Cc:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-none" v-model="cc" placeholder="Email"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "sendMail",
  data () {
    return {
      sendTo: '',
      bcc: '',
      cc: ''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
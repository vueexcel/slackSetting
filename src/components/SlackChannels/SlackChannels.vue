<template>
  <b-form-group label="Slack Channels">
    <b-form-input
      @keypress.esc="searchField = ''"
      type="search"
      class="w-25"
      v-model="searchField"
      name="search"
      placeholder="Search"
    ></b-form-input>
    <b-form-checkbox-group
      id="checkbox-group-1"
      v-model="selectedSlackChannel[unikey]"
      name="flavour-1"
    >
      <!-- v-for="(channel,index) in slackChannels" -->
      <!-- @input="updateMessage( msg,key )" -->
      <b-form-checkbox
        :value="channel.value"
        v-for="(channel,index) in searchFilter"
        :key="index"
      >{{channel.text}}</b-form-checkbox>
    </b-form-checkbox-group>
  </b-form-group>
</template>

<script>
export default {
  name: "SlackChannels",
  data() {
    return {
      searchField: ""
    };
  },
  props: {
    unikey: {
      type: Number
    },
    selectedSlackChannel: {
      type: Array,
      default: []
    },
    slackChannels: {
      type: Array,
      default: []
    }
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
  }
};
</script>

<style lang="scss" scoped>
</style>
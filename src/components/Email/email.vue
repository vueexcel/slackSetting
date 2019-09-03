<template>
  <Widget customHeader v-if="mail !== null">
    <b-row class="col-container">
      <b-col cols="9" class="col">
        <b-row>
          <b-col cols="1">
            <span>Send to:</span>
          </b-col>
          <b-col cols="11">
            <b-form-group id="email">
              <b-input type="text" v-model="tag" v-on:keyup="addBid" class="mt-2"></b-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="1">
            <span>Subject</span>
          </b-col>
          <b-col cols="11">
            <b-form-group id="email">
              <b-input type="text" v-model="tag" v-on:keyup="addBid" class="mt-2"></b-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="1">
            <span>Body</span>
          </b-col>
          <b-col cols="11">
            <vue-editor v-model="mail.body" :editorToolbar="customToolbar"></vue-editor>
            <b-button class="btn-rounded-f mt-lg" variant="primary" @click="editBody">Ok</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3" class="col">
        <h5>
          <strong>Variables</strong>
        </h5>
        <b-list-group class="border border-secondary">
          <b-list-group-item v-for="varaible in variables" :key="varaible.id">{{varaible.name}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </Widget>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      tag: "",
      bodyEdit: false,
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ],
      genReport: null
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    mail: {
      type: Object,
      default: {}
    },
    variables: {
      type: Array,
      default: []
    }
  },
  components: {
    Widget,
    VueEditor
  },
  methods: {
    addBid() {
      if (
        event.key == "," ||
        event.key == ";" ||
        event.key == " " ||
        event.key == "Enter"
      ) {
        let stringArr = this.tag.split(/[ , ; \n \\]+/);
        if (stringArr.length) {
          stringArr.forEach(str => {
            if (str.length) {
              var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (reg.test(str) == true) {
                this.tags.push(str);
                this.$emit("emailArray", {
                  index: this.index,
                  email: this.tags
                });
              } else {
                this.rottentags.push(str);
              }
            }
          });
        }
        this.tag = "";
      }
    },
    editBody() {
      this.bodyEdit = true;
      this.genReport = this.mail.body;
    }
  },
  watch: {
    //   genReport(newValue, oldValue) {
    //       console.log(newValue.match(new RegExp("str", "g")) || []).length,'********');
    //   }
  }
};
</script>

<style>
.col-container{
    display: table;
}

.col {
    display: table-cell;
}
</style>
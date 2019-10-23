<template>
  <div class="px-2">
    <b-row align-v="center">
      <b-col cols="10" class="d-flex">
        <span for="email" class="w-70">
          <i class="fa fa-envelope text-warning" />
          <i class="font-weight-bold">&nbsp;Email</i>
        </span>
        <b-form-checkbox switch class="ml-2">On</b-form-checkbox>
      </b-col>
      <b-col cols="2">
        <b-button variant="success" pill class="float-right">Test</b-button>
      </b-col>

      <b-col cols="12" class="d-flex">
        <span class="d-block w-70">
          <i class="fa fa-slack text-info" />
          <i class="font-weight-bold">&nbsp;Slack</i>
        </span>
        <b-form-checkbox switch class="ml-2">On</b-form-checkbox>
      </b-col>
      <b-col cols="12" class="d-flex mt-1">
        <span class="w-70">
          <i class="fa fa-mobile-phone text-primary" :style="{ 'fontSize': '18px' }" />
          <i class="font-weight-bold">&nbsp;Phone</i>
        </span>
        <b-form-checkbox switch class="ml-2">On</b-form-checkbox>
      </b-col>
    </b-row>

    <hr class="mt-1 mb-1" />
    <b-row align-v="center">
      <b-col cols="1">
        <span>Send To</span>
      </b-col>
      <b-col cols="11">
        <b-form-group id="email">
          <b-input type="text" v-model="tag" v-on:keyup="addBid" class="mt-2"></b-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <div class="d-flex flex-wrap">
        <div v-for="(bid,bidIndex) in tags" :key="bidIndex" class="width_chip mt-1 ml-1">
          <div class="bg-primary text-white rounded-pill pl-2 pr-2 cursor">
            <span>{{bid}}</span>
            &nbsp;
            <i class="fa fa-times" @click="deleteBid(bidIndex)"></i>
          </div>
        </div>
      </div>
    </b-row>
    <b-row>
      <div class="d-flex flex-wrap">
        <div v-for="(bid,index) in rottentags" :key="index" class="width_chip mt-1 ml-1">
          <div class="bg-danger text-white rounded-pill pl-2 pr-2 cursor">
            <span>{{bid}}</span>
            &nbsp;
            <i class="fa fa-times" @click="deleterottentags(index)"></i>
          </div>
        </div>
      </div>
    </b-row>
    <b-row align-v="center" class="pb-3">
      <b-col cols="1">
        <span>Subject</span>
      </b-col>
      <b-col cols="11" v-if="!editSubject">
        <span class="text-success font-weight-bold">
          <i>
            {{subjectToShow}}
            <b-badge class="mr-xs cursor ml-3" variant="primary" @click="editSubjectFun" pill>Edit</b-badge>
          </i>
        </span>
      </b-col>
      <b-col v-else>
        <b-form-group id="email">
          <b-input type="text" v-model="subject" class="mt-2"></b-input>
        </b-form-group>
        <b-button pill variant="danger" @click="cancelSubjectEdit">Cancel</b-button>
        <b-button pill variant="success" class="ml-3" @click="saveSubject">Save</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: "",
      subject: "",
      subjectToShow: "This is the Subject",
      tags: [],
      rottentags: [],
      editSubject: false
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
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
    deleteBid(index) {
      this.tags.splice(index, 1);
      this.$emit("emailArray", {
        index: this.index,
        email: this.tags
      });
    },
    deleterottentags(index) {
      this.rottentags.splice(index, 1);
    },
    editSubjectFun() {
      this.editSubject = !this.editSubject;
      this.subject = this.subjectToShow;
    },
    cancelSubjectEdit() {
      this.editSubject = false;
      this.subject = this.subjectToShow;
    },
    saveSubject() {
      this.subjectToShow = this.subject;
      this.editSubject = false;
    }
  }
};
</script>

<style  src="./../TmsSettings.scss" lang="scss" />
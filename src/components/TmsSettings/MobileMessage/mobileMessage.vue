<template>
  <div class="px-2">
    <label for="mobileMessage">
      <i class="font-weight-bold">Mobile Message</i>
    </label>
    <hr class="mt-1 mb-1" />

    <!-- <ValidationProvider rules="required|email" v-slot="{ errors }">
  <input v-model="phone" v-validate="phone" data-vv-rules="required" type="text">
  <span>{{ errors[0] }}</span>
    </ValidationProvider>-->
    <b-form-group id="mobileMessage">
      <b-input type="text" v-model="phone" v-on:keyup="addMobile"></b-input>
    </b-form-group>
    <div class="d-flex flex-wrap">
      <div v-for="(bid,bidIndex) in tags" :key="bidIndex" class="width_chip mt-1 ml-1">
        <div class="bg-primary text-white rounded-pill pl-2 pr-2 cursor">
          <span>{{bid}}</span>
          &nbsp;
          <i class="fa fa-times" @click="deleteNumber(bidIndex)"></i>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <div v-for="(bid,index) in rottentags" :key="index" class="width_chip mt-1 ml-1">
        <div class="bg-danger text-white rounded-pill pl-2 pr-2 cursor">
          <span>{{bid}}</span>
          &nbsp;
          <i class="fa fa-times" @click="deleterottentags(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: null,
      tags: [],
      rottentags: []
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addMobile() {
      if (
        event.key == "," ||
        event.key == ";" ||
        event.key == " " ||
        event.key == "Enter"
      ) {
        let stringArr = this.phone.split(/[ , ; \n \\]+/);
        if (stringArr.length) {
          stringArr.forEach(str => {
            var reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            if (reg.test(str) == true) {
              this.tags.push(str);
              this.$emit("mobileArray", {
                index: this.index,
                number: this.tags
              });
            } else {
              this.rottentags.push(str);
            }
          });
        }
        this.phone = "";
      }
    },
    deleteNumber(index) {
      this.tags.splice(index, 1);
      this.$emit("emailArray", {
        index: this.index,
        number: this.tags
      });
    },
    deleterottentags(index) {
      this.rottentags.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
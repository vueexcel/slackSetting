<template>
  <div>
    <b-modal
      id="confirm"
      @ok="handleOk"
      @hidden="resetModal"
      ref="modal"
      hide-header
      no-close-on-esc
      no-close-on-backdrop
      title="BootstrapVue"
    >
      <p class="my-4"></p>
      <ul>
        <li v-for="(tag,index) in tags" :key="index">
          <!-- <span class="d-inline-block w-50 mb-3">{{ index+1 }}. {{tag}}</span> -->
          <b-form-group
            horizontal
            :label="tag"
            :label-for="tag.substr(1)"
            label-class="text-md-right"
            :label-cols="5"
            breakpoint="md"
          >
            <b-form-input
              type="text"
              v-model="form.tags[tag.substr(1)]"
              :id="tag.substr(1)"
              :placeholder="tag"
            />
          </b-form-group>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "confirm",
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        tags: {}
      }
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.$emit("tags", this.form.tags);
      //----- Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }
      //----- Push the name to submitted names
      // this.submittedNames.push(this.name);
      //----- Hide the modal manually
      // this.$nextTick(() => {
      //   this.$refs.modal.hide();
      // });
    },
    resetModal() {
      this.form.tags = {};
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
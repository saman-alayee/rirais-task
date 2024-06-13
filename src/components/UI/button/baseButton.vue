<template>
  <button :class="computedClasses" @click="handleClick">
    <i v-if="icon" :class="iconClasses"></i>
    <span>{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonClasses: {
      type: String,
      default: '',
    },
    iconClasses: {
      type: String,
      required: false,
    },
  },
  computed: {
    computedClasses() {
      return `${this.buttonClasses}`;
    }
  },
  methods: {
    handleClick() {
      // Emit an event or perform any action needed on button click
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
/* Add any necessary custom styles here */
</style>

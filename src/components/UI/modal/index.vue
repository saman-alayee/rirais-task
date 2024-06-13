<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal--background" @click="closeModal"></div>
      <div class="modal--content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    openModal() {
      this.isActive = true;
    },
    closeModal() {
      this.isActive = false;
    }
  }
};
</script>

<style scoped>

</style>
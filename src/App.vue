<!-- App.vue -->
<template>
  <div id="app">
    <div>
      <Navbar />
    </div>
    <div></div>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/UI/navbar/navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
</style>

<template>
  <div id="app">
    <div class="text-center">
      <img alt="Vue logo" style="width: 20%" src="./assets/logo.png" />
    </div>
    <ApexRandom msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import ApexRandom from "./components/ApexRandom.vue";

export default {
  name: "App",
  components: {
    ApexRandom,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

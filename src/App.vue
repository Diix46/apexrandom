<template>
  <div id="app">
    <div class="text-center">
      <img style="width: 20%" src="./assets/logo.png" />
    </div>
    <ApexRandom />
  </div>
</template>

<script>
import ApexRandom from "./components/ApexRandom.vue"
export default {
  name: "App",
  components:{
    ApexRandom
  }
};
</script>
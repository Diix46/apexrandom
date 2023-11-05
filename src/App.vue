<template>
  <div id="app">
    <div class="mainHeader">Apex Legend</div>
    <ApexRandom />
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
<style scoped>
.mainHeader {
  display: flex;
  justify-content: center;
  height: 2rem;
  font-family: ApexLegend, serif;
  color: white;
  font-size: 2rem;
}

#app {
  background-image: url(/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
}
</style>

<template>
  <div id="app">
    <div class="mainHeader">
      Apex Legend
    </div>
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
.mainHeader{
  margin-left: 0.5%;
  display: flex;
  height: 2rem;
  font-family: ApexLegend;
  font-size: 2rem;
}
</style>
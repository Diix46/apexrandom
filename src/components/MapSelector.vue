<template>
  <div>
    <div v-for="map in maps" :key="map">
      <input type="radio" :value="map" v-model="checkedMap"/>
      <label>{{map}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapSelector",
  data() {
    return {
      maps: ["King's Canyon", "Olympus", "World's Edge"],
      checkedMap: "King's Canyon"
    };
  },
  watch:{
    checkedMap:{
      handler(){
        this.$emit('map-select', this.checkedMap)
      },
      immediate:true,
    }
  },
};
</script>

<style>

</style>
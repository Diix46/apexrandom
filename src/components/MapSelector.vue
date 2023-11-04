<template>
  <div class="affMap">
    <div
      v-for="map in maps"
      :key="map.name"
      class="oneMap"
    >
      <img
        :src="`./img/maps/${map.img}.jpg`"
        :class="{
          mapNotSelected: !(checkedMap === map.name),
          mapSelected: checkedMap === map.name,
        }"
        width="98%"
        @click="onMapSelect(map.name)"
      >
      <p class="mapText">
        {{ map.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapSelector",
  data() {
    return {
      maps: [
        { name: "King's Canyon", img: "KC" },
        { name: "Olympus", img: "Olympus" },
        { name: "World's Edge", img: "WE" },
      ],
      checkedMap: "King's Canyon",
    };
  },

  watch: {
    checkedMap: {
      handler() {
        this.$emit("map-select", this.checkedMap);
      },
      immediate: true,
    },
  },

  methods: {
    onMapSelect: function (nameMap) {
      this.checkedMap = nameMap;
    },
  },
};
</script>

<style>
.affMap {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  font-family: ApexLegend;
  font-size: 2rem;
}
.oneMap{
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
.mapText{
  justify-items: flex-start;
  position: absolute;
  bottom: 0;
  margin: 0 0 10px 10px;
}
.mapNotSelected {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
}
.mapSelected {
  border: 3px solid black;
  box-shadow: 4px 4px 0px #696969;
}
@media (max-width: 800px) {
  .affMap{
    margin-left: 0.5rem;
  }
}
</style>
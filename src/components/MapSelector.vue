<template>
  <div class="affMap">
    <div v-for="map in maps" :key="map.name">
      <img
        @click="onMapSelect(map.name)"
        :src="`./img/maps/${map.img}.jpg`"
        :class="{
          mapNotSelected: !(checkedMap === map.name),
          mapSelected: checkedMap === map.name,
        }"
        width="98%"
      />
      <p :class="map.img">
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

  methods: {
    onMapSelect: function (nameMap) {
      this.checkedMap = nameMap;
    },
  },

  watch: {
    checkedMap: {
      handler() {
        this.$emit("map-select", this.checkedMap);
      },
      immediate: true,
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
.KC{
  position: relative;
  text-align: left;
  bottom: 50px;
  left: 20px;
  margin-bottom: -20px;
}
.Olympus{
  position: relative;
  text-align: left;
  bottom: 50px;
  left: 20px;
  margin-bottom: -20px;
}
.WE{
  position: relative;
  text-align: left;
  bottom: 50px;
  left: 20px;
  margin-bottom: -20px;
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
  .affMap {
    margin-left: 3%;
  }
}
</style>
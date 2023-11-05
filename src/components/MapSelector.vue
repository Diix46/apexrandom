<template>
  <div class="affMap">
    <div
      v-for="map in maps"
      :key="map.name"
      class="oneMap"
      :class="{
        mapNotSelected: !(checkedMap === map.name),
        mapSelected: checkedMap === map.name,
      }"
    >
      <img
        :src="`./img/maps/${map.img}.jpg`"
        width="100%"
        alt="${map.name}"
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
  props: {
    maps: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
  flex: 1;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  font-family: ApexLegend, serif;
  color: white;
  -webkit-text-stroke: 1px black;
  font-size: 2.5rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.affMap::-webkit-scrollbar {
  display: none;
}

.oneMap:hover {
  border: 3px solid #b93038;
  box-shadow: 4px 4px 4px #696969;
}

.oneMap {
  display: flex;
  position: relative;
  border: 3px solid transparent;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.mapText {
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
  border-color: #b93038;
  box-shadow: 4px 4px 0 #696969;
}

@media (max-width: 800px) {
  .affMap {
    margin-left: 0.5rem;
  }
}
</style>

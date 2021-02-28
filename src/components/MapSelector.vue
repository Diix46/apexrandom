<template>
  <div class="affMap">
    <div v-for="map in maps" :key="map.name" :class="map.class">
      <img
        @click="onMapSelect(map.name)"
        :src="`./img/maps/${map.class}.jpg`"
        :class="{ mapSelected: !(checkedMap === map.name) }"
        width="98%"
      />
      <p class="nomMap">
      {{map.name}}
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
        { name: "King's Canyon", class: "KC" },
        { name: "Olympus", class: "Olympus" },
        { name: "World's Edge", class: "WE" },
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
.affMap{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  font-family: ApexLegend;
  font-size: 2rem;
}
.nomMap{
  text-align: left;
  margin-left: 1%;
}
.Olympus {
  background-image: url(/img/OlySelect.jpg) no-repeat;
}
.WE {
  background-image: url(/img/WESelect.jpg) no-repeat;
}
.KC {
  background-image: url(/img/KCSelect.jpg) no-repeat;
}
.mapSelected {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
}
</style>
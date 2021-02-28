<template>
  <div class="character">
    <ul v-for="char in allCharacters" :key="char.name">
      <li @click="onImgClick(char)">
        <div :class="{ owned: !char.owned , notowned: char.owned }">
        <img
          :src="`./img/${char.img}`"
          height="100px"
          width="100px"
        />
        <p>{{ char.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CharacterSelector",
  props: {
    allCharacters: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onImgClick: function (char) {
      char.owned = !char.owned;
    },
  },
};
</script>

<style>
.character {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;
  font-family: ApexLegend;
  text-align: center;
  font-size: 1.5rem;
}
.owned {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
  background-color: #fa9759;
  border: 4px solid white;
}
.notowned{
  border: 4px solid #B93038;
}
li{
  margin-left: 1.5px;
  margin-right: 1.5px;
  margin-bottom: 3px;
}
</style>
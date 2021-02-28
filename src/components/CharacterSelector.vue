<template>
  <div class="character">
      <li v-for="char in allCharacters" :key="char.name" @click="onImgClick(char)">
        <div :class="{ notowned: !char.owned , owned: char.owned }">
        <img
          :src="`./img/characters/${char.img}`"
          height="100px"
          width="100px"
        />
        <p>{{ char.name }}</p>
        </div>
      </li>
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
.notowned {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
  background-color: #fa9759;
  border: 4px solid white;
}
.owned{
  border: 4px solid #B93038;
  box-shadow: 2px 2px 0px #696969;
}
li{
  list-style-type : none;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 5px;
}
</style>
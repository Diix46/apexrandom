<template>
  <div>
    <h1>Selectionner les personnages possédés :</h1>
    <ul v-for="char in allCharacters" :key="char.name">
      <li @click="onImgClick(char)">
        <img
          :src="`./img/${char.img}`"
          :class="{ owned: !char.owned }"
          height="100px"
          width="100px"
        />
        <p>{{ char.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CharacterSelector",
  props:{
    allCharacters:{
      type:Array,
      required:true,
    }
  },


  methods: {
    onImgClick: function (char) {
      char.owned = !char.owned;
    },
  },
};
</script>

<style scoped>
.owned {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
}
</style>
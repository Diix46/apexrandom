<template>
  <div class="character">
    <li
      v-for="char in allCharacters"
      :key="char.name"
      @click="onImgClick(char)"
    >
      <div :class="{ notowned: !char.owned, owned: char.owned }">
        <img
          :src="`./img/characters/${char.img}`"
          height="100px"
          width="100px"
        />
        <p>{{ char.name }}</p>
      </div>
    </li>
    <button @click="allSelected()" v-if="this.haveAllLegends">
      Unselect all Legends
    </button>
    <button @click="allSelected()" v-if="!this.haveAllLegends">
      Select all Legends
    </button>
    <button @click="restoreDefault()">Restore Default</button>
  </div>
</template>

<script>
import { defaultLegends } from "./../shared/characters";

export default {
  name: "CharacterSelector",
  props: {
    allCharacters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      haveAllLegends: false,
    };
  },

  methods: {
    onImgClick: function (char) {
      char.owned = !char.owned;
    },
    restoreDefault: function () {
      for (const char of this.allCharacters) {
        char.owned = defaultLegends.includes(char.name);
      }
      this.haveAllLegends = false;
    },
    allSelected: function () {
      for (const char of this.allCharacters) {
        char.owned = !this.haveAllLegends;
      }
      this.haveAllLegends = !this.haveAllLegends;
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

li:hover {
  border: 2px solid #b93038;
  box-shadow: 4px 4px 4px #696969;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 1px;
}

.notowned {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
  background-color: #fa9759;
  border: 4px solid white;
}

.owned {
  border: 4px solid #b93038;
  box-shadow: 2px 2px 2px #696969;
}

li {
  list-style-type: none;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 5px;
}

button {
  font-family: ApexLegend;
  border: 1px solid black;
  margin-right: 2%;
  color: white;
  background-color: #f97b2e;
  font-size: 2rem;
  box-shadow: 2px 2px 2px #696969;
  text-decoration: none;
  margin-bottom: 3%;
}
</style>

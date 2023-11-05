<template>
  <div class="character">
    <div v-for="type in defaultTypes" :key="type.id">
      <div class="title">
        <img :src="`./img/${type.img}`" height="25px" width="25px" />
        <p>{{ type.label }}</p>
      </div>

      <ul class="typeofLegends">
        <li
          v-for="char in triList(type.id)"
          :key="char.name"
          @click="onImgClick(char)"
          :class="{ charNotSelected: !char.owned, charSelected: char.owned }"
        >
          <img
            :src="`./img/characters/${char.img}`"
            class="legends"
            alt="${char.name}"
          />
          <p>{{ char.name }}</p>
        </li>
      </ul>
    </div>
    <div class="action">
      <button
        class="buttonLegends"
        v-if="haveAllLegends"
        @click="allSelected()"
      >
        Unselect all Legends
      </button>
      <button
        class="buttonLegends"
        v-if="!haveAllLegends"
        @click="allSelected()"
      >
        Select all Legends
      </button>
      <button class="buttonLegends" @click="restoreDefault()">
        Restore Default
      </button>
    </div>
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
    defaultLegends: {
      type: Array,
      required: true,
    },
    defaultTypes: {
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
        char.owned = this.defaultLegends.includes(char.name);
      }
      this.haveAllLegends = false;
    },
    allSelected: function () {
      for (const char of this.allCharacters) {
        char.owned = !this.haveAllLegends;
      }
      this.haveAllLegends = !this.haveAllLegends;
    },
    triList: function (id) {
      return this.allCharacters.filter((w) => w.type === id);
    },
  },
};
</script>

<style>
.character {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  font-family: ApexLegend, serif;
  text-align: center;
  font-size: 1.5rem;
}

li:hover {
  border: 3px solid #b93038;
  box-shadow: 4px 4px 4px #696969;
}

.charNotSelected {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
  background-color: #fa9759;
}

.charSelected {
  border: 3px solid #b93038;
  background-color: white;
  box-shadow: 2px 2px 2px #696969;
}

li {
  list-style-type: none;
  border: 3px solid transparent;
}

.buttonLegends {
  flex: 1;
  font-family: ApexLegend, serif;
  border: 1px solid black;
  margin-right: 2%;
  color: white;
  background-color: #f97b2e;
  font-size: 2rem;
  box-shadow: 2px 2px 2px #696969;
  text-decoration: none;
  margin-bottom: 3%;
}

.buttonLegends:hover {
  box-shadow: 4px 4px 4px #696969;
}

.typeofLegends {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 3px;
}

.title {
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
}

.action {
  display: flex;
  flex-direction: row;
}

.legends {
  width: 100%;
}

@media (max-width: 800px) {
  .typeofLegends {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 3px;
  }
}
</style>

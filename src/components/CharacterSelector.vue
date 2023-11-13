<template>
  <div class="character">
    <div v-for="type in defaultTypes" :key="type.id">
      <div class="title">
        <img :src="`./img/${type.img}`" height="25px" width="25px" alt="Default Legends">
        <p>{{ type.label }}</p>
      </div>

      <ul class="typeofLegends">
        <li v-for="char in triList(type.id)" :key="char.name"
          :class="{ charNotSelected: !char.owned, charSelected: char.owned }" @click="onImgClick(char)">
          <img :src="`./img/characters/${char.img}`" class="legends" alt="${char.name}">
          <p>{{ char.name }}</p>
        </li>
      </ul>
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

  methods: {
    onImgClick: function (char) {
      char.owned = !char.owned;
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
  flex: 1;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  font-family: ApexLegend, serif;
  text-align: center;
  font-size: 1.5rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.character::-webkit-scrollbar {
  display: none;
}

.typeofLegends {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 3px;
}

.typeofLegends li {
  list-style-type: none;
  border: 3px solid transparent;
}

.typeofLegends li:hover {
  border: 3px solid #b93038;
  box-shadow: 4px 4px 4px #696969;
  cursor: pointer;
}

.typeofLegends .charSelected {
  border: 3px solid #b93038;
  background-color: white;
  box-shadow: 2px 2px 2px #696969;
}

.typeofLegends .charNotSelected {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
  background-color: #fa9759;
}

.title {
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
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

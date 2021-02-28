<template>
  <div class="box">
    <div class="charSelector" style="flex: 1">
      <div class="header">
        <h1>Vos légendes</h1>
        <p>Veuillez selectionner les légendes que vous possédez :</p>
      </div>
      <CharacterSelector v-bind:all-characters="allCharacters" />
    </div>
    <div class="mapSelector" style="flex: 1">
      <div class="header">
        <h1>La map</h1>
        <p>Veuillez selectionner la map en cours :</p>
        <button v-if="ownedCharacters.length" :disabled="!ownedCharacters.length" @click="onRandomClick()">
          Random
        </button>
      </div>
      <MapSelector v-on:map-select="onMapSelect($event)" />
    </div>
    <div v-if="results" class="ShowResults" style="flex: 2">
      <div class="header">
        <h1>Voici le résultat</h1>
      </div>
      <ShowResults v-if="results" v-bind:results="results" />
    </div>
  </div>
</template>

<script>
import ShowResults from "./ShowResults.vue";
import CharacterSelector from "./CharacterSelector.vue";
import MapSelector from "./MapSelector.vue";

import characters from "./../shared/characters";
import weapons from "./../shared/weapons";

export default {
  name: "ApexRandom",
  components: {
    ShowResults,
    CharacterSelector,
    MapSelector,
  },
  data() {
    return {
      allCharacters: characters,
      allWeapons: weapons,
      selectedMap: null,
      selectedCharacter: null,
      selectedWeapons: null,
    };
  },
  computed: {
    ownedCharacters() {
      return this.allCharacters.filter((c) => c.owned);
    },
    results() {
      if (!this.selectedCharacter) {
        return null;
      }
      return {
        character: this.selectedCharacter,
        weapons: this.selectedWeapons,
        map: this.selectedMap,
        abilites: Math.floor(Math.random() * 2),
        ultimate: Math.floor(Math.random() * 2)
      };
    },
  },

  methods: {
    onRandomClick: function () {
      this.selectedCharacter = null;
      this.selectedCharacter = this.selectCharacter();
      this.selectedWeapons = this.selectWeapons();
    },

    selectCharacter: function () {
      const rand = Math.floor(Math.random() * this.ownedCharacters.length);
      return this.ownedCharacters[rand];
    },

    selectWeapons: function () {
      const firstWeaponIndex = Math.floor(
        Math.random() * this.allWeapons.length
      );
      let secondWeaponIndex = Math.floor(
        Math.random() * this.allWeapons.length
      );
      while (firstWeaponIndex === secondWeaponIndex) {
        secondWeaponIndex = Math.floor(Math.random() * this.allWeapons.length);
      }
      return [
        this.allWeapons[firstWeaponIndex],
        this.allWeapons[secondWeaponIndex],
      ];
    },

    onMapSelect: function (event) {
      this.selectedMap = event;
    },
  },
};
</script>

<style>
.box {
  display: flex;
  flex-direction: row;
}
.charSelector {
  margin-left: 0.5%;
  margin-right: 0.5%;
}
.mapSelector {
  margin-left: 0.25%;
  margin-right: 0.25%;
}
.ShowResults {
  margin-left: 0.5%;
  margin-right: 0.5%;
}
.header {
  background-image: url(/img/texture.jpg);
  height: 17rem;
  text-align: center;
  font-family: ApexLegend;
  font-size: 1.5rem;
  color: white;
}

h1 {
  font-size: 4rem;
  font-family: ApexLegend;
  color: black;
}
button {
  margin-top: 7%;
  font-family: ApexLegend;
  border: none;
  color: white;
  background-color: #f97b2e;
  font-size: 4rem;
  text-decoration: none;
}
@media (max-width: 800px) {
  .box {
    flex-direction: column;
  }
}
</style>
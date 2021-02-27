<template>
  <div>
    <CharacterSelector v-bind:all-characters="allCharacters" />
    <MapSelector v-on:map-select="onMapSelect($event)" />
    <button :disabled="!ownedCharacters.length" @click="onRandomClick()">
      Random
    </button>
    <ShowResults v-if="results" v-bind:results="results" />
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
      };
    },
  },

  methods: {
    onRandomClick: function () {
      this.selectedCharacter = null;
      //appel la fonction selectChar de CharacterSelector
      this.selectedCharacter = this.selectCharacter();
      //appel la fonction selectWeapon de WeaponSelector
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
</style>
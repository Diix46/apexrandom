<template>
  <div class="box">
    <div class="container">
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
        </div>
        <MapSelector v-on:map-select="onMapSelect($event)" />
        <button
          v-if="ownedCharacters.length"
          :disabled="!ownedCharacters.length"
          @click="onRandomClick()"
        >
          Random
        </button>
      </div>
    </div>
    <div v-if="results" class="overlay" @click="onCloseClick()"></div>
    <div v-if="results" class="ShowResults">
      <div class="header">
        <h1>Voici le résultat</h1>
      </div>
      <ShowResults v-if="results" v-bind:results="results" v-bind:onCloseClick="onCloseClick"/>
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
      abilitiesAllowed: null,
      ultimateAllowed: null,
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
        abilities: this.abilitiesAllowed,
        ultimate: this.ultimateAllowed,
      };
    },
  },

  methods: {
    onCloseClick: function () {
      this.selectedCharacter = null;
      this.selectedWeapons = null;
      this.abilitiesAllowed = null;
      this.ultimateAllowed = null;
    },

    onRandomClick: function () {
      this.selectedCharacter = null;
      this.selectedCharacter = this.selectCharacter();
      this.selectedWeapons = this.selectWeapons();
      this.abilitiesAllowed = Math.floor(Math.random() * 2);
      this.ultimateAllowed = Math.floor(Math.random() * 2);
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
  justify-content: center;
  align-items: center;
}
.container {
  flex-direction: row;
  display: flex;
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  position: fixed;
  top: 3%;
  background: #f1f1f1;
  padding: 20px;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.header {
  background-image: url(/img/texture.jpg);
  height: 30%;
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
  font-family: ApexLegend;
  border: 1px solid black;
  color: white;
  background-color: #f97b2e;
  font-size: 4rem;
  text-decoration: none;
  box-shadow: 4px 4px 0px #696969;
  margin-bottom: 3%;
}
@media (max-width: 800px) {
  .box {
    flex-direction: column;
  }
  .container {
    max-width: 100%;
    flex-direction: column;
  }
  .ShowResults {
    width: 80%;
  }
}
</style>
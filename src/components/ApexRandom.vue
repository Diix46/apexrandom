<template>
  <div class="box">
    <div class="container">
      <div class="charSelector">
        <div class="header">
          <h1>Your Legends</h1>
          <p>Select your legends :</p>
        </div>
        <CharacterSelector
          :all-characters="allCharacters"
          :default-legends="defaultLegends"
          :default-types="defaultTypes"
        />
        <div class="action">
          <button
            v-if="haveAllLegends"
            class="buttonRandom"
            @click="allSelected()"
          >
            Unselect all Legends
          </button>
          <button
            v-if="!haveAllLegends"
            class="buttonRandom"
            @click="allSelected()"
          >
            Select all Legends
          </button>
          <button class="buttonRandom" @click="restoreDefault()">
            Restore Default
          </button>
        </div>
      </div>
      <div class="mapSelector">
        <div class="header">
          <h1>Maps</h1>
          <p>Select your map :</p>
        </div>
        <MapSelector :maps="maps" @map-select="onMapSelect($event)" />
        <div class="action">
          <button
            v-if="ownedCharacters.length"
            class="buttonRandom"
            :disabled="!ownedCharacters.length"
            @click="onRandomClick()"
          >
            Random
          </button>
        </div>
      </div>
    </div>
    <div v-if="results" class="overlay" @click="onCloseClick()" />
    <div v-if="results" class="showResults">
      <div class="header">
        <h1>Result</h1>
      </div>
      <ShowResults
        v-if="results"
        :results="results"
        :ammo-type="allTypeAmmo"
        @on-close-click="onCloseClick"
      />
    </div>
  </div>
</template>

<script>
import ShowResults from "./ShowResults.vue";
import CharacterSelector from "./CharacterSelector.vue";
import MapSelector from "./MapSelector.vue";

import characters from "./../shared/characters.json";
import weapons from "./../shared/weapons.json";
import maps from "./../shared/maps.json";

export default {
  name: "ApexRandom",
  components: {
    ShowResults,
    CharacterSelector,
    MapSelector,
  },
  data() {
    return {
      allCharacters: characters.allCharacters,
      defaultTypes: characters.defaultTypes,
      defaultLegends: characters.defaultLegends,
      maps: maps.maps,
      allWeapons: weapons.weapons,
      allTypeAmmo: weapons.ammo,
      haveAllLegends: false,
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
    weaponNotInPackage() {
      return this.allWeapons.filter((w) => !w.isPackage);
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
        Math.random() * this.weaponNotInPackage.length
      );
      let secondWeaponIndex = Math.floor(
        Math.random() * this.weaponNotInPackage.length
      );
      while (firstWeaponIndex === secondWeaponIndex) {
        secondWeaponIndex = Math.floor(
          Math.random() * this.weaponNotInPackage.length
        );
      }
      return [
        this.weaponNotInPackage[firstWeaponIndex],
        this.weaponNotInPackage[secondWeaponIndex],
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
  display: flex;
  flex-direction: row;
  width: 100vh;
  justify-content: center;
  gap: 1%;
}

.charSelector {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  padding: 1%;
  height: 91vh;
}

.action {
  display: flex;
  flex-direction: row;
  gap: 2%;
}

.mapSelector {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  padding: 1%;
  height: 91vh;
}

.showResults {
  position: fixed;
  top: 3%;
  background: #f1f1f1;
  padding: 20px;
  border: 1px solid black;
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
  height: 100px;
  text-align: center;
  font-family: ApexLegend, serif;
  font-size: 1.5rem;
  color: white;
}

h1 {
  font-size: 4rem;
  font-family: ApexLegend, serif;
  color: black;
}

.buttonRandom {
  flex: 1;
  font-family: ApexLegend, serif;
  color: white;
  background-color: #f97b2e;
  font-size: 2rem;
  box-shadow: 2px 2px 2px #696969;
  text-decoration: none;
  width: 100%;
}

.buttonRandom:hover {
  box-shadow: 4px 4px 4px #696969;
}

@media (max-width: 800px) {
  .box {
    flex-direction: column;
  }

  .container {
    max-width: 100%;
    flex-direction: column;
  }

  .showResults {
    width: 80%;
  }

  button {
    margin-left: 0.5rem;
  }

  .header {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}

@media (orientation: landscape) {
  .showResults {
    /* margin-top: -25%; */
    position: absolute;
    transform: scale(0.8);
  }
}
</style>

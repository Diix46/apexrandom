<template>
  <div>
    <h1>Selection du personnage :</h1>
    <ul v-for="char in characters" :key="char.name">
      <img
        @click="onImgClick(char)"
        :src="`./img/${char.img}`"
        class="image"
        height="100px"
        width="100px"
      />
      <li class="card">{{ char.Name }} {{ char.isPosseded }}</li>
    </ul>

    <div v-if="activated" class="btn btn-danger" @click="onRandomClick()">Random</div>

    <!-- Affichage des selections -->
    <ul v-for="char in selectedChar" :key="char.name">
      <li v-if="char.selected">
        <div class="card">
          {{ char.Name }}
        </div>
      </li>
    </ul>

    <ul v-for="weapon in selectedWeapons" :key="weapon.name">
      <li v-if="weapon.selected">
        <div class="card">
          {{ weapon.Name }}
        </div>
      </li>
    </ul>
    <div class="card">Q spell : {{ spell }}, Ultimate : {{ ultimate }}</div>
  </div>
</template>

<script>
export default {
  name: "ApexRandom",
  data() {
    return {
      characters: [
        {
          Name: "Bangalore",
          img: "bangalore.png",
          isPosseded: true,
          selected: false,
        },
        {
          Name: "Bloodhound",
          img: "bloodhound.png",
          isPosseded: true,
          selected: false,
        },
        {
          Name: "Caustic",
          img: "caustic.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Crypto",
          img: "crypto.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Fuse",
          img: "fuse.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Gibraltar",
          img: "gibraltar.png",
          isPosseded: true,
          selected: false,
        },
        {
          Name: "Horizon",
          img: "horizon.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Lifeline",
          img: "lifeline.png",
          isPosseded: true,
          selected: false,
        },
        {
          Name: "Loba",
          img: "loba.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Mirage",
          img: "mirage.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Octane",
          img: "octane.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Pathfinder",
          img: "pathfinder.png",
          isPosseded: true,
          selected: false,
        },
        {
          Name: "Rampart",
          img: "rampart.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Revenant",
          img: "revenant.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Wattson",
          img: "wattson.png",
          isPosseded: false,
          selected: false,
        },
        {
          Name: "Wraith",
          img: "wraith.png",
          isPosseded: true,
          selected: false,
        },
      ],
      selectedChar: [],
      weapons: [
        { Name: "Havoc", selected: false },
        { Name: "Flatline", selected: false },
        { Name: "G7 Scout", selected: false },
        { Name: "Hemlock", selected: false },
        { Name: "R-301", selected: false },
        { Name: "30-30 Repeater", selected: false },
        { Name: "Alternator", selected: false },
        { Name: "R-99", selected: false },
        { Name: "Volt", selected: false },
        { Name: "Devotion", selected: false },
        { Name: "Sptifire", selected: false },
        { Name: "L-STAR", selected: false },
        { Name: "Charge Rifle", selected: false },
        { Name: "Longbow", selected: false },
        { Name: "Sentinel", selected: false },
        { Name: "TripleTake", selected: false },
        { Name: "EVA-8", selected: false },
        { Name: "Mastiff", selected: false },
        { Name: "Mozambique", selected: false },
        { Name: "RE-45", selected: false },
        { Name: "P2020", selected: false },
        { Name: "Wingman", selected: false },
      ],
      selectedWeapons: [],
      spell: true,
      ultimate: true,
      activated: true,
    };
  },

  methods: {
    onRandomClick: function() {
      this.selectWeapon();
      this.selectChar();
      this.abilitiesAllowed();
    },

    onImgClick: function(char){
      char.isPosseded = !char.isPosseded
      this.activated = this.disabledButton()
    },

    disabledButton: function(){
      let compteur = 0;
      for(let i = 0; i <this.characters.length; i++){
        if(this.characters[i].isPosseded){
          compteur++;
        }
        }
        if(compteur == 0){
          return false
        } else {
          return true
        }
    },

    selectWeapon: function () {
      this.selectedWeapons = []; 
      for (let i = 0; i < this.weapons.length; i++) {
        const obj = Object.assign({}, this.weapons[i]);
        this.selectedWeapons.push(obj);
      }
      let numberOfWeaponSelected = this.selectedWeapons.filter(
        (elem) => elem.selected
      ).length;
      while (numberOfWeaponSelected < 2) {
        const rand = Math.floor(Math.random() * this.selectedWeapons.length);
        this.selectedWeapons[rand].selected = true;
        numberOfWeaponSelected = this.selectedWeapons.filter((elem) => elem.selected)
          .length;
      }
    },

    selectChar: function () {
      this.selectedChar = [];
      for (let i = 0; i < this.characters.length; i++) {
          const obj = Object.assign({}, this.characters[i]);
          this.selectedChar.push(obj);
      }
      if (this.selectedChar.length != 0) {
        let numberOfCharSelected = this.selectedChar.filter((elem) => elem.selected)
          .length;
        while (numberOfCharSelected < 1) {
          const rand = Math.floor(Math.random() * this.selectedChar.length);
          this.selectedChar[rand].selected = true;
          numberOfCharSelected = this.selectedChar.filter((elem) => elem.selected)
            .length;
        }
      }
    },

    abilitiesAllowed: function () {
      var rand = Math.floor(Math.random() * 3);
      var rand2 = Math.floor(Math.random() * 3);
      if (rand == 1) {
        this.spell = true;
      } else {
        this.spell = false;
      }
      if (rand2 == 1) {
        this.ultimate = true;
      } else {
        this.ultimate = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

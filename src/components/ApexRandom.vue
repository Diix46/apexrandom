<template>
  <div>
    <h1>Selectionner les personnages possédés :</h1>
    <div class="container">
      <div class="row">
        <ul v-for="char in characters" :key="char.name">
          <div class="col">
            <li class="card">
              <img
                @click="onImgClick(char)"
                :src="`./img/${char.img}`"
                :class="{ posseded: !char.isPosseded }"
                height="100px"
                width="100px"
              />
              {{ char.Name }}
            </li>
          </div>
        </ul>
      </div>
    </div>

    <div v-if="activated" class="btn btn-danger" @click="onRandomClick()">
      Random
    </div>

    <div onload="drawSpawn()" class="map">
      <canvas></canvas>
    </div>

    <!-- Affichage des selections -->
    <div class="container">
      <div v-if="selectedWeapons.length || selectedWeaponsGenerals.length">
        <div class="card" style="width: 20rem">
          <ul v-for="char in selectedCharacters" :key="char.name">
            <div class="col">
              {{ char.Name }}
              <img
                :src="`./img/${char.img}`"
                class="image"
                height="100px"
                width="100px"
              />
            </div>
          </ul>

          <ul v-for="weap in selectedWeapons" :key="weap.name">
            Arme :
            {{
              weap.Name
            }}
          </ul>
          <ul v-for="weapG in selectedWeaponsGenerals" :key="weapG.name">
            Arme :
            {{
              weapG.Name
            }}
          </ul>
          Utilisation de l'abilité :
          {{ spell ? "Tu as le droit" : "Tu n'as pas le droit" }}
          <br />
          Utilisation de l'ultime :
          {{ ultimate ? "Tu as le droit" : "Tu n'as pas le droit" }}
        </div>
      </div>
    </div>
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
      weaponsGenerals: [
        { Name: "N'importe quel sniper", selected: false },
        { Name: "N'importe quel pompes ou armes legère", selected: false },
        { Name: "6 Arce Star dans l'inventaire", selected: false },
        { Name: "N'importe quel pistolet", selected: false },
        { Name: "N'importe quel arme lourde", selected: false },
        {
          Name: "Pas le droit de swap sur les cadavres (armes)",
          selected: false,
        },
      ],
      spell: true,
      ultimate: true,
      activated: true,
    };
  },
  computed: {
    selectedWeapons() {
      return this.weapons.filter((w) => w.selected);
    },
    selectedWeaponsGenerals() {
      return this.weaponsGenerals.filter((w) => w.selected);
    },
    selectedCharacters() {
      return this.characters.filter((w) => w.selected);
    },
  },

  methods: {
    initData: function () {
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i].selected = false;
      }
      for (let j = 0; j < this.weapons.length; j++) {
        this.weapons[j].selected = false;
      }
      for (let k = 0; k < this.weaponsGenerals.length; k++) {
        this.weaponsGenerals[k].selected = false;
      }
    },

    onRandomClick: function () {
      this.initData();
      this.selectChar();
      this.selectWeapon();
      this.abilitiesAllowed();
    },

    onImgClick: function (char) {
      char.isPosseded = !char.isPosseded;
      this.activated = this.disabledButton();
    },

    disabledButton: function () {
      let compteur = 0;
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i].isPosseded) {
          compteur++;
        }
      }
      if (compteur == 0) {
        return false;
      } else {
        return true;
      }
    },

    selectWeapon: function () {
      let numberOfWeaponSelected =
        this.weapons.filter((elem) => elem.selected).length +
        this.weaponsGenerals.filter((elem) => elem.selected).length;
      while (numberOfWeaponSelected < 2) {
        const randGenerals = Math.floor(Math.random() * 100);
        if (randGenerals > 40) {
          const classWeapons = Math.floor(
            Math.random() * this.weaponsGenerals.length
          );
          this.weaponsGenerals[classWeapons].selected = true;
        } else {
          const rand = Math.floor(Math.random() * this.weapons.length);
          this.weapons[rand].selected = true;
        }
        numberOfWeaponSelected =
          this.weapons.filter((elem) => elem.selected).length +
          this.weaponsGenerals.filter((elem) => elem.selected).length;
      }
    },

    selectChar: function () {
      let numberOfCharSelected = this.characters.filter((elem) => elem.selected)
        .length;
      while (numberOfCharSelected < 1) {
        const rand = Math.floor(Math.random() * this.characters.length);
        if (this.characters[rand].isPosseded) {
          this.characters[rand].selected = true;
        }
        numberOfCharSelected = this.characters.filter((elem) => elem.selected)
          .length;
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

    drawSpawn: function () {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posseded {
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
}

.map {
  background: url(/img/map.jpg) no-repeat center;
  background-size: contain;
  width: 600px;
  height: 600px;
  border: 2px solid black;
}
</style>

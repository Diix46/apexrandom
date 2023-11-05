<template>
  <div>
    <div class="resultWithoutMap">
      <img
        class="characterImg"
        :src="`./img/characters/${results.character.img}`"
        alt="${results.character.name}"
      />
      <div class="result">
        <div class="charName">
          {{ results.character.name }}
        </div>
        <div class="inventory">
          <img
            class="ammo"
            :src="`./img/${ammoType[results.weapons[0].ammoType - 1].img}`"
            alt="Ammo 1"
          />
          <img
            class="ammo"
            :src="`./img/${ammoType[results.weapons[1].ammoType - 1].img}`"
            alt="Ammo 2"
          />
          <div v-if="attachement === 0">
            <img class="ammo" src="img/Heat_Shield.png" alt="Attachement" />
          </div>
          <div v-else-if="attachement === 1">
            <img
              class="ammo"
              src="img/Mobile_Respawn_Beacon.png"
              alt="Attachement"
            />
          </div>
          <div v-else-if="attachement === 2">
            <img class="ammo" src="img/Evac_Tower.png" alt="Attachement" />
          </div>
        </div>

        <ul class="naid">
          <img class="ammo" src="img/Frag_Grenade.png" alt="Frag Grenade" />
          <p>x {{ this.randNaid()[0] }}</p>
          <img class="ammo" src="img/Arc_Star.png" alt="Arc Star" />
          <p>x {{ this.randNaid()[1] }}</p>
          <img
            class="ammo"
            src="img/Thermite_Grenade.png"
            alt="Thermite Grenade"
          />
          <p>x {{ this.randNaid()[2] }}</p>
        </ul>

        <div>
          <img
            class="weaponsImg"
            :src="`./img/weapons/${results.weapons[0].img}`"
            alt="${results.weapons[0].name}"
          />
          {{ results.weapons[0].name }}
        </div>
        <div>
          <img
            class="weaponsImg"
            :src="`./img/weapons/${results.weapons[1].img}`"
            alt="${results.weapons[1].name}"
          />
          {{ results.weapons[1].name }}
        </div>
        <div class="abilities">
          <div v-if="results.abilities === 1">
            <img src="./../../public/img/abilities.png" alt="Abilities" />
            Abilities ok
          </div>
          <div v-else>
            <img src="./../../public/img/abilities.png" alt="No Abilities" />
            No abilities
          </div>
        </div>
        <div class="ultimate">
          <div v-if="results.ultimate === 1">
            <img src="./../../public/img/ultimate.png" alt="Ultimate" />
            Ultimate ok
          </div>
          <div v-else>
            <img src="./../../public/img/ultimate.png" alt="No Ultimate" />
            No ultimate
          </div>
        </div>
      </div>
    </div>
    <div :class="classSpawn">
      <canvas id="canvas" width="508" height="505" />
    </div>
    <button class="closeButton" @click="onCloseClick">Close</button>
  </div>
</template>

<script>
export default {
  name: "ShowResults",
  props: {
    results: {
      type: Object,
    },
    onCloseClick: {
      type: Function,
    },
    ammoType: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      spawns: {
        tabKC: [
          {
            Name: "Escargot",
            posX: 0.46,
            posY: 0.45,
            longueur: 30,
            largeur: 30,
          },
          {
            Name: "Centre de traitement",
            posX: 0.47,
            posY: 0.88,
            longueur: 85,
            largeur: 40,
          },
          {
            Name: "Base Aerienne",
            posX: 0.07,
            posY: 0.48,
            longueur: 40,
            largeur: 80,
          },
          {
            Name: "Repulseur",
            posX: 0.7,
            posY: 0.7,
            longueur: 80,
            largeur: 40,
          },
          {
            Name: "Ville Cimetiere",
            posX: 0.23,
            posY: 0.68,
            longueur: 90,
            largeur: 75,
          },
          { Name: "Bunker", posX: 0.3, posY: 0.4, longueur: 40, largeur: 80 },
          { Name: "Marais", posX: 0.88, posY: 0.42, longueur: 50, largeur: 80 },
          {
            Name: "Artillerie",
            posX: 0.47,
            posY: 0.11,
            longueur: 72,
            largeur: 40,
          },
          {
            Name: "Tour du Nord",
            posX: 0.4,
            posY: 0.22,
            longueur: 70,
            largeur: 30,
          },
          {
            Name: "Lacs Toxiques",
            posX: 0.08,
            posY: 0.19,
            longueur: 80,
            largeur: 40,
          },
        ],
        tabOly: [
          {
            Name: "Escargot",
            posX: 0.46,
            posY: 0.45,
            longueur: 30,
            largeur: 30,
          },
        ],
        tabWE: [
          {
            Name: "Escargot",
            posX: 0.85,
            posY: 0.62,
            longueur: 30,
            largeur: 30,
          },
        ],
        tabSP: [
          {
            Name: "Escargot",
            posX: 0.85,
            posY: 0.62,
            longueur: 30,
            largeur: 30,
          },
        ],
        tabBM: [
          {
            Name: "Escargot",
            posX: 0.85,
            posY: 0.62,
            longueur: 30,
            largeur: 30,
          },
        ],
      },
      spell: true,
      ultimate: true,
      naidAllowed: [],
    };
  },
  computed: {
    tabSpawn: function () {
      if (this.results.map === "King's Canyon") {
        return this.spawns.tabKC;
      } else if (this.results.map === "Olympus") {
        return this.spawns.tabOly;
      } else if (this.results.map === "World's Edge") {
        return this.spawns.tabWE;
      } else if (this.results.map === "Storm Point") {
        return this.spawns.tabSP;
      } else if (this.results.map === "Broken Moon") {
        return this.spawns.tabBM;
      }
      return null;
    },

    attachement: function () {
      return Math.floor(Math.random() * 3);
    },

    classSpawn: function () {
      if (this.results.map === "King's Canyon") {
        return "canvasKC";
      } else if (this.results.map === "Olympus") {
        return "canvasOly";
      } else if (this.results.map === "World's Edge") {
        return "canvasWE";
      } else if (this.results.map === "Storm Point") {
        return "canvasSP";
      } else if (this.results.map === "Broken Moon") {
        return "canvasBM";
      }
      return null;
    },
  },
  mounted() {
    this.drawSpawn();
  },
  updated() {
    this.drawSpawn();
  },
  methods: {
    drawSpawn: function () {
      const canvas = document.getElementById("canvas");
      const h = canvas.height;
      const w = canvas.width;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);
      if (canvas.getContext) {
        const rand = Math.floor(Math.random() * this.tabSpawn.length);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "black";
        const x = this.tabSpawn[rand].posX * w + 0.5;
        const y = this.tabSpawn[rand].posY * h + 0.5;
        ctx.strokeRect(
          x,
          y,
          this.tabSpawn[rand].longueur,
          this.tabSpawn[rand].largeur
        );
        ctx.font = "2.5rem ApexLegend";
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText(this.tabSpawn[rand].Name, w * 0.05, h * 0.95);
        ctx.fillText(this.tabSpawn[rand].Name, w * 0.05, h * 0.95);
      }
    },

    abilitiesAllowed: function () {
      const rand = Math.floor(Math.random() * 3);
      const rand2 = Math.floor(Math.random() * 3);
      this.spell = rand === 1;
      this.ultimate = rand2 === 1;
    },

    randNaid: function () {
      return [
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.charName {
  font-size: 3rem;
}

.closeButton {
  font-size: 2rem;
  width: 100%;
  margin-bottom: -10px;
  margin-top: 10px;
  font-family: ApexLegend, serif;
  color: black;
  border: 1px solid black;
  background-color: #b93038;
}

.closeButton:hover {
  box-shadow: 4px 4px 4px #696969;
}

.characterImg {
  width: 220px;
  border: 4px solid #b93038;
  box-shadow: 3px 3px 0 #696969;
}

.weaponsImg {
  width: 50px;
  height: 20px;
}

.resultWithoutMap {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
}

.result {
  flex-direction: column;
  justify-content: center;
  font-family: ApexLegend, serif;
  font-size: 2rem;
  margin-left: 3%;
}

.canvasKC {
  background: url(/img/maps/mapKC.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasOly {
  background: url(/img/maps/mapOly.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasWE {
  background: url(/img/maps/mapWE.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasSP {
  background: url(/img/maps/mapSP.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasBM {
  background: url(/img/maps/mapBM.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.ammo {
  width: 40px;
}

.naid {
  display: flex;
  flex-direction: row;
}

.inventory {
  display: flex;
  flex-direction: row;
}

@media (max-width: 800px) {
  .closeButton {
    margin-left: -1%;
  }
}
</style>

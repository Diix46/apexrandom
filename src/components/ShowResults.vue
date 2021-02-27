<template>
  <div>
    {{ results.character.name }}
    {{ results.weapons[0].name }}
    {{ results.weapons[1].name }}
    {{ results.map }}
    <div :class="classSpawn">
      <canvas id="canvas" width="508" height="505"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowResults",
  props: {
    results: {
      type: Object,
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
      },
      spell: true,
      ultimate: true,
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
      }
      return null;
    },

    classSpawn: function () {
      if (this.results.map === "King's Canyon") {
        return "canvasKC";
      } else if (this.results.map === "Olympus") {
        return "canvasOly";
      } else if (this.results.map === "World's Edge") {
        return "canvasWE";
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
        console.log(rand);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        const x = this.tabSpawn[rand].posX * w + 0.5;
        const y = this.tabSpawn[rand].posY * h + 0.5;
        ctx.strokeRect(
          x,
          y,
          this.tabSpawn[rand].longueur,
          this.tabSpawn[rand].largeur
        );
        ctx.font = "2rem Helvetica";
        ctx.fillText(this.tabSpawn[rand].Name, w * 0.05, h * 0.95);
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
.canvasKC {
  background: url(/img/mapKC.jpg) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasOly {
  background: url(/img/mapOly.jpg) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}

.canvasWE {
  background: url(/img/mapWE.jpg) no-repeat;
  background-size: contain;
  width: 100%;
  height: auto;
}
</style>

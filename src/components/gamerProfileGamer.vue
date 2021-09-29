<template>
  <v-main>
    <v-container class="spacing-playground pa-6">
      <v-row justify="center" align="center">
        <v-col sm="10" md="6">
          <v-card>
            <v-card-title class="justify-center pa-8">
              <h2>GAMER AMATEUR</h2>
            </v-card-title>
            <v-form
                id="streamerProfile"
                method="post"
                action=""
                lazy-validation
            >
            <v-container class="ma-5" fluid>
              <h4>Nivel de juego general</h4>
              <v-row justify="center" class="ma-5">
                <v-col align="center" sm="4">
                  <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
                  <v-radio class="justify-center ma-2" color="blue" id="gamer-level-newbie" name="gamer-level" value="newbie" v-model="gamerLevel"></v-radio>
                  <label for="gamer-level-newbie">Novato</label>
                </v-col>
                <v-col align="center" sm="4">
                  <v-img src="@/assets/svg/medalla-de-plata.svg" class="icon"></v-img>
                  <v-radio class="justify-center ma-2" color="blue" id="gamer-level-average" name="gamer-level" value="average" v-model="gamerLevel"></v-radio>
                  <label for="gamer-level-average">Medio</label>
                </v-col>
                <v-col align="center" sm="4">
                  <v-img src="@/assets/svg/medalla-de-oro.svg" class="icon"></v-img>
                  <v-radio class="justify-center ma-2" color="blue" id="gamer-level-veteran" name="gamer-level" value="veteran" v-model="gamerLevel"></v-radio>
                  <label for="gamer-level-veteran">Semi Pro</label>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="ma-5" fluid>
              <h4>Logros</h4>
              <v-row justify="center" class="ma-5">
                <div
                    v-for="(tournamentResultName, i) in tournamentsResultsNames"
                    :key="i"
                    class="text-fields-row"
                >
                  <v-row justify="center">
                    <v-col sm="6">
                      <v-text-field
                          class="ma-2"
                          :label="tournamentResultName.label"
                          v-model="tournamentResultName.value"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                          class="ma-2"
                          v-model="tournamentsResultsPositions[i]"
                          :items="possibleResults"
                          :rules="[v => !!v || 'Item is required']"
                          label="Seleccione posición"
                          required
                      ></v-select>
                    </v-col>
                    <v-col sm="1">
                      <v-btn @click="removeTournament(i)" class="error">Quitar</v-btn>
                    </v-col>

                  </v-row>
                </div>
              </v-row>
              <v-row justify="center">
                <v-btn @click="addTournament" class="ma-3 primary">+ Agregar logro</v-btn>
              </v-row>

            </v-container>
            <v-container class="ma-5" fluid>
              <h4>Experiencia en videojuegos</h4>
              <v-row justify="center" class="ma-5">
                <div
                    v-for="(gamesExperienceName, i) in gamesExperienceNames"
                    :key="i"
                    class="text-fields-row"
                >
                  <v-row justify="center">
                    <v-col sm="6">
                      <v-text-field
                          class="ma-2"
                          :label="gamesExperienceName.label"
                          v-model="gamesExperienceName.value"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                          class="ma-2"
                          v-model="gamesExperienceTimes[i]"
                          :items="possibleTimes"
                          :rules="[v => !!v || 'Item is required']"
                          label="Seleccione posición"
                          required
                      ></v-select>
                    </v-col>
                    <v-col sm="1">
                      <v-btn @click="removeGame(i)" class="error">Quitar</v-btn>
                    </v-col>

                  </v-row>
                </div>
              </v-row>
              <v-row justify="center">
                <v-btn @click="addGame" class="ma-3 primary">+ Agregar juego</v-btn>
              </v-row>

            </v-container>
            <v-container class="ma-5" fluid>
              <h4>Videojuegos favoritos</h4>
              <v-row justify="space-around" width class="ma-5" fluid>
                <div
                    v-for="(game, i) in popularGames"
                    :key="i"
                    class=""
                >
                  <v-col align="center" >
                    <v-img src="game.imageURL"></v-img>
                    <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames"></v-checkbox>
                  </v-col>
                </div>
              </v-row>
            </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "gamerProfileGamer",
  data: () => {
    return {
      // Registra el valor de nivel de juego "newbie | average | veteran"
      gamerLevel: "",
      // v-text-fields con los nombres de los torneos en los que registra su participación
      tournamentsResultsNames: [],
      // Array simple con el resultado de cada torneo (index de possibleResults), el index corresponde en orden al de tournamentsResultsNames
      tournamentsResultsPositions: [],
      // Son los posibles resultados que el usuario podrá escoger por torneo
      possibleResults: [
        'Top 10',
        'Tercer puesto',
        'Segundo puesto',
        'Primer puesto'
      ],
      // v-text-fields con los nombres de los juegos en los que el usuario tiene experiencia
      gamesExperienceNames: [],
      // Array simple con el index del tiempo de juego (index de possibleTimes) de cada experiencia en juego registrado, index corresponde al orden de gamesExperienceNames
      gamesExperienceTimes: [],
      // Posibles tiempos a registrar por experiencia de juego
      possibleTimes: [
        'Días',
        'Semanas',
        'Meses',
        'Años'
      ],
      selectedPopularGames: [],
      // Lista de juegos populares a mostrar, array de objetos
      popularGames: [
        {
          id: 0,
          name: "CS: GO",
          imageURL: ""
        },
        {
          id: 1,
          name: "LoL",
          imageURL: ""
        },
        {
          id: 2,
          name: "Fortnite",
          imageURL: ""
        },
        {
          id: 3,
          name: "CoD: Warzone",
          imageURL: ""
        },
        {
          id: 4,
          name: "Valorant",
          imageURL: ""
        }
      ]
    }
  },
  methods: {
    // Muestra un nuevo campo para agregar un torneo y su resultado
    addTournament () {
      this.tournamentsResultsPositions.push(this.possibleResults[0]);
      this.tournamentsResultsNames.push({
        label: "Nombre de torneo",
        value: "",
      })
    },

    // Elimina algún campo de resultado de torneo según el index indicado
    removeTournament (index) {
      // Eliminamos también la posición de dicho torneo que guardamos en el otro array
      this.tournamentsResultsPositions.splice(index, 1);
      this.tournamentsResultsNames.splice(index, 1)
    },

    // Muestra un nuevo campo para agregar experiencia en un juego
    addGame () {
      this.gamesExperienceTimes.push(this.possibleTimes[0]);
      this.gamesExperienceNames.push({
        label: "Nombre de juego",
        value: "",
      })
    },

    // Elimina algún campo de experiencia en juego de acuerdo al index indicado
    removeGame (index) {
      // Eliminamos también la posición de dicho torneo que guardamos en el otro array
      this.gamesExperienceTimes.splice(index, 1);
      this.gamesExperienceNames.splice(index, 1)
    }
  }
}
</script>

<style>
.icon
{
  width: 48px;
  height: 48px;
}
.v-input--checkbox .v-input__slot
{
  flex-direction: column;
}
</style>
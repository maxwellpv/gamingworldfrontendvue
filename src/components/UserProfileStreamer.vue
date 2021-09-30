<template>
  <v-main>
    <v-container>
      <v-app-bar
          app color="indigo darken-1" dark>
        <v-app-bar-title class="white--text">User Type</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn class="indigo darken-1" icon @click="showNewsPage" >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-app-bar>
    </v-container>
    <v-container class="spacing-playground pa-6">
      <v-row justify="center" align="center">
        <v-col cols="12"  sm="10" md="8" lg="7" xl="6">
          <v-card class="pa-10">
            <v-card-title class="justify-center">
              <h2>STREAMER</h2>
            </v-card-title>
            <v-form
                id="gamerProfile"
                method="post"
                action=""
                lazy-validation
            >
            <v-container fluid>
              <h4>Añadir categorías de streaming</h4>
              <v-row justify="space-around" class="ma-5">
                <v-col
                    cols="12"
                    md="6"
                    v-for="(selectedCategory, i) in selectedStreamingCategories"
                    :key="i"
                    class="text-fields-row"
                >
                  <v-row class="pa-2">
                      <v-select
                          v-model="selectedStreamingCategories[i]"
                          :items="streamingCategories"
                          :rules="[v => !!v || 'Item is required']"
                          label="Seleccione categoría"
                          required
                      ></v-select>
                      <v-btn v-if="i > 2" @click="removeStreamingCategory(i)" class="error">X</v-btn>
                  </v-row>
                </v-col>
                <v-col
                    cols="12" md="6"
                  align="center">
                  <v-btn @click="addStreamingCategory" class="primary">+ Agregar</v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid>
              <h4>Registrar Patrocinador</h4>
              <v-row justify="space-around" class="ma-5">
                <v-col
                    cols="12"
                    md="6"
                    v-for="(partner, i) in registeredPartners"
                    :key="i"
                    >
                    <v-row class="ma-1">
                      <v-text-field
                          label="Marca"
                          v-model="registeredPartners[i]"
                          required
                      ></v-text-field>
                      <v-btn @click="removePartner(i)" class="error">X</v-btn>
                    </v-row>
                </v-col>
                <v-col
                    cols="12" md="6"
                    align="center">
                  <v-btn @click="addPartner" class="primary">+ Agregar</v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="my-5" fluid>
              <h4>Videojuegos favoritos para stremear</h4>
              <v-row justify="space-around" width class="ma-5" fluid>
                <div
                    v-for="(game, i) in popularGames"
                    :key="i"
                    class=""
                >
                  <v-col align="center">
                    <v-img src="game.imageURL"></v-img>
                    <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
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
  name: "gamerProfileStreamer",
  data: () => {
    return {
      igdbApiKey: "",
      selectedStreamingCategories: [0, 0, 0],
      streamingCategories: [
          "PC",
          "Movil",
          "Consola",
          "Battle Royale",
          "Multiplayer",
          "Campaign"
      ],
      registeredPartners: [""],
      selectedPopularGames: Array(0),
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
    addPartner()
    {
      this.registeredPartners.push("");
    },
    removePartner(index)
    {
      this.registeredPartners.splice(index, 1);
    },
    addStreamingCategory()
    {
      this.selectedStreamingCategories.push(0);
    },
    removeStreamingCategory(index)
    {
      if (index < 3)
        return;
      this.selectedStreamingCategories.splice(index, 1);
    },
    showNewsPage() {
      this.$router.push('News')
    },
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
.v-select .dropdown-toggle {
  display: flex !important;
  flex-wrap: wrap;}

.v-select{
  flex-basis: 20px;
  flex-grow: 1;
  padding: 0 20px 0 10px;
  width: 80% !important;
}

.v-app-bar-title__content {
  min-width: 120px;
}
</style>
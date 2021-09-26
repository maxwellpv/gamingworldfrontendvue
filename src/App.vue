<template>
  <v-app>
    <!--  Barra de navegacion  -->
    <v-container>
      <v-app-bar app color="primary" flat dark>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>GamingWorld</v-toolbar-title>

        <v-text-field class="d-flex mt-auto " style="max-width: 250px" label="Search ..." append-icon="mdi-magnify"  solo  background-color="primary" dark></v-text-field>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>



        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>




      </v-app-bar>
    </v-container>


    <v-main>


      <v-div >
        <v-row no-gutters>
          <v-col cols="12" sm="2">
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-btn @click="searchArticles('videogames')">VideoGames</v-btn>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-btn @click="searchArticles('steam')">Steam</v-btn>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-btn @click="searchArticles('twitch')">Twitch</v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

          </v-col>

          <v-col cols="12" sm="8">
            <v-container fluid>
              <main-content :articles="articles"></main-content>
            </v-container>
          </v-col>

          <v-col cols="12" sm="2">
            <v-card>
              equisde
            </v-card>

          </v-col>
        </v-row>



      </v-div>



      <v-footer class="secondary" app>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3"></div>
            Made whit
            <v-icon>

            </v-icon>

          </v-flex>
        </v-layout>

      </v-footer>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";
import MainContent from "@/components/main-content";



export default {
  name: 'App',

  components: {
    MainContent

  },

  data: () => ({
    drawer: false,
    apiKey: '30a01aa6438d4782906f35bb2f136a91',
    articles:[],
    errors:[]
  }),

  created() {
    axios.get(`https://newsapi.org/v2/everything?q=Gamer&language=es&apiKey=${this.apiKey}`)
        .then(response => {
          this.articles = response.data.articles;
          console.log('data: ');
          console.log(response.data.articles)
        })
  },

  methods:{
    searchArticles(theme){
      this.drawer = !this.drawer;
      axios.get(`https://newsapi.org/v2/everything?q=${theme}&apiKey=${this.apiKey}`)
          .then(response => {
            this.articles = response.data.articles;
            console.log('data: ');
            console.log(response.data.articles);
          })
          .catch(e=>{
            this.errors.push(e);
          })
    }
  }

};
</script>

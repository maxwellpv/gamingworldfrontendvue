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
      <div>
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
              Twitch Themes
            </v-card>

            <!--  Premium Ad Preview -->
              <v-card class="mt-lg-5" >
                <v-card-title>
                  Support GamingWorld
                </v-card-title>
                <v-card-text>
                  Become a premium member and get access to exclusive tools to find
                  users with the same competitive level and interest than you for just 5$.
                </v-card-text>
                <v-icon size="75" class="d-flex justify-center">
                  mdi-credit-card-outline
                </v-icon>
                <template>
                  <div class="text-center pa-3">
                    <v-dialog v-model="dialog" width="700">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn block color="primary" dark v-bind="attrs" v-on="on">
                          More Information
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="font-weight-black pb-10">
                          Subscribe to GamingWorld
                        </v-card-title>
                        <v-card-subtitle>
                          <h3>
                            Are you a competitive player?
                          </h3>
                        </v-card-subtitle>
                        <v-card-text class="pb-10">
                          Be able to match with players with the same skill cap than you
                          and improve your chance of success!
                        </v-card-text>
                        <v-card-subtitle>
                          <h3>
                            Are you a streamer?
                          </h3>
                        </v-card-subtitle>
                        <v-card-text>
                          Match with other videogame content creators and expand your
                          community by sharing common events!
                        </v-card-text>
                        <div class="d-flex justify-center">
                          <v-card color="primary"  width="auto" class="align-center" dark>
                            <v-card-title class="justify-center">Premium Plan <br> $5.00/Monthly</v-card-title>
                          </v-card>
                        </div>



                        <v-card-actions>
                            <v-btn color="red" @click="dialog = false" dark>
                              Close
                            </v-btn>
                            <v-btn color="primary" @click="dialog = false" dark>
                              Purchase
                            </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template>
              </v-card>

          </v-col>
        </v-row>
      </div>



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
    errors:[],
    dialog: false,

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

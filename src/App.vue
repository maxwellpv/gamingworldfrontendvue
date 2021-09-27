<template>
  <v-app>
    <!--  Barra de navegacion  -->
    <v-container>
      <v-app-bar app color="primary" flat dark class=" red">
        <v-toolbar-title>GamingWorld</v-toolbar-title>
        <v-spacer></v-spacer>
        <template class="d-flex justify-center red">
          <v-text-field class="d-flex mt-auto" style="max-width: 250px" label="Search ..." append-icon="mdi-magnify"  solo flat  background-color="primary" dark></v-text-field>
        </template>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-account-circle</v-icon>
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

      <v-main class="background">
        <!--  ScrollToTop Button  -->
        <v-container>
          <v-btn
              v-scroll="onScroll"
              v-show="fab"
              fab
              dark
              fixed
              bottom
              right
              color="primary"
              @click="toTop"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-container>
        <v-container >
        <div>
          <v-row no-gutters>
            <v-col cols="12" sm="2">
              <v-card>
                <v-list>
                  <v-list-item-title class="pl-3"><h2>Filter By</h2></v-list-item-title>
                  <v-list-item >
                    <v-list-item-content >
                      <v-btn class="d-flex justify-start" text @click="searchArticles('videogames')">VideoGames</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn class="d-flex justify-start" text @click="searchArticles('steam')">Steam</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-btn class="d-flex justify-start" text @click="searchArticles('twitch')">Twitch</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="12" sm="8">
              <v-container class="mt-n3">
                <main-content :articles="articles"></main-content>
              </v-container>
            </v-col>
            <v-col cols="12" sm="2">
              <v-card min-width="220">
                <v-card-title >Twitch Categories</v-card-title>
              </v-card>

              <!--  Premium Ad Preview -->
              <v-card class="mt-lg-5" min-width="220">
                <v-card-title class="justify-start " >
                  Support <br> GamingWorld
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
                          <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
                          <v-card color="background2"  width="auto" class="align-center" dark>
                            <v-card-title class="justify-center">Premium Plan <br> $5.00/Monthly</v-card-title>
                          </v-card>
                        </div>
                        <v-card-actions>
                          <v-btn color="warning" @click="dialog = false" dark>
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
        </v-container>
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
    fab:false,

  }),
  created() {
    axios.get(`https://newsapi.org/v2/everything?q=Gamer&language=es&apiKey=${this.apiKey}`)
        .then(response => {
          this.articles = response.data.articles;
          let new_articles = response.data.articles
              .filter(({urlToImage, description}) => (urlToImage && description));
          this.articles = new_articles;
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
            let new_articles = response.data.articles
                .filter(({urlToImage, description}) => (urlToImage && description));
            this.articles = new_articles;
            console.log('data: ');
            console.log(response.data.articles);
          })
          .catch(e=>{
            this.errors.push(e);
          })
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }


  }
};
</script>

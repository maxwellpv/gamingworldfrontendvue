<template>
    <v-container>
      <nav-bar></nav-bar>
      <v-row no-gutters>
        <v-col xs="12" sm="3">
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
        <v-col xs="12" sm="6">
          <v-container class="mt-n3">
            <news-content :articles="articles"></news-content>
          </v-container>
        </v-col>
        <v-col xs="12" sm="3">
          <v-card >
            <v-card-title class=" text-justify">Popular Twitch<br> Themes</v-card-title>

            <template v-for="(article) in topGames">

                <v-list :cols="index === 0 ? 12 : 6" :key="article.name">
                  <v-list-item class="d-flex text-justify">
                    <v-img class="rounded-circle" v-bind:src="article.box_art_url.slice(0,-20) + '32x32.jpg'" width="32px" height="32px" max-width="32px" max-height="32px"></v-img>
                    <v-spacer></v-spacer>
                    <h5>{{article.name}}</h5>
                  </v-list-item>
                </v-list>

            </template>

          </v-card>

          <!--  Premium Ad Preview -->
          <v-card class="mt-lg-5 my-3" >
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
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" width="100%" >
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
    </v-container>

</template>

<script>


import axios from "axios";
import NewsContent from "../components/NewsContent";
import NavBar from "../components/NavBar";


export default {
  name: 'news-page',

  components: {
    NavBar,
    NewsContent,
  },

  data: () => ({
    //apiKey: '30a01aa6438d4782906f35bb2f136a91',
    articles:[],
    topGames:[],
    errors:[],
    tempArticles:[],
    dialog: false,
    fab:false,

  }),
  created() {
    axios.get('https://aos-twitch-api.herokuapp.com/twitch/top-games')
        .then( topGames => {
          this.topGames = topGames.data.data;
          console.log(this.topGames);
        })
    axios.get(`https://xempre.com/request.php?theme=Gamer`)
        .then(response => {
          this.articles = response.data.articles;
          this.tempArticles = response.data.articles
              .filter(({urlToImage, description}) => (urlToImage && description));
          this.articles = this.tempArticles;
          this.tempArticles = [];
          console.log('data: ');
          console.log(response.data.articles)
        })
  },
  methods:{
    searchArticles(theme){
      axios.get(`https://xempre.com/request.php?theme=${theme}`)
          .then(response => {
            this.articles = response.data.articles;
            this.tempArticles = response.data.articles
                .filter(({urlToImage, description}) => (urlToImage && description));
            this.articles = this.tempArticles;
            this.tempArticles = [];
            console.log('data: ');
            console.log(response.data.articles);
          })
          .catch(e=>{
            this.errors.push(e);
          })
    },




  }
};
</script>

<style scoped>

</style>
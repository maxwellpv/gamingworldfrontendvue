<template>
    <v-container>
      <nav-bar></nav-bar>
      <v-row no-gutters>
        <v-col xs="12" sm="3">
          <v-card>
            <v-list>
              <v-list-item-title class="pl-3"><h2>{{$t('Filter')}}</h2></v-list-item-title>
              <v-list-item >
                <v-list-item-content >
                  <v-btn class="d-flex justify-start" text @click="searchArticles('videogames')">{{$t('Videogames')}}</v-btn>
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
            <v-card-title class=" text-justify">{{$t('Twitch-1')}}<br> {{$t('Twitch-2')}}</v-card-title>

            <template v-for="(article, index) in topGames">
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
          <premium-dialog class="mt-lg-5 my-3"></premium-dialog>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
import NewsContent from "../components/NewsContent";
import NavBar from "../components/NavBar";
import PremiumDialog from "../components/PremiumDialog";
import NewsService from "../services/news.service";
import GamesService from "../services/games.service";

export default {
  name: 'news-page',

  components: {
    NavBar,
    NewsContent,
    PremiumDialog
  },

  data: () => ({
    articles:[],
    topGames:[],
    errors:[],
    tempArticles:[],
    dialog: false,
    fab:false,

  }),
  created() {
    GamesService.getTopGames()
        .then( topGames => {
          this.topGames = topGames.data.data;

        })
    NewsService.getGeneralList()
        .then(response => {
          this.articles = response.data.articles;
          this.tempArticles = response.data.articles
              .filter(({urlToImage, description}) => (urlToImage && description));
          this.articles = this.tempArticles;
          this.tempArticles = [];

        })
  },
  methods:{
    searchArticles(theme){
      NewsService.getListByTheme(theme)
          .then(response => {
            this.articles = response.data.articles;
            this.tempArticles = response.data.articles
                .filter(({urlToImage, description}) => (urlToImage && description));
            this.articles = this.tempArticles;
            this.tempArticles = [];

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

<i18n>
{
  "en": {
    "Filter": "Filter By",
    "Videogames": "Videogames",
    "Twitch-1": "Popular Twitch",
    "Twitch-2": "Categories"
  },
  "es": {
    "Filter": "Filtrar Por",
    "Videogames": "Videojuegos",
    "Twitch-1": "Categorias populares",
    "Twitch-2": "de Twitch"
  }
}

</i18n>
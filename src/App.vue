<template>
  <v-app>
    <nav-bar></nav-bar>
      <v-main class="background">

        <!--  ScrollToTop Button  -->
        <v-container>
          <v-btn class="mb-5"
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
        <news-page></news-page>
      </v-main>
    <footer-content></footer-content>
  </v-app>
</template>

<script>


import NavBar from "./components/nav-bar";
import FooterContent from "./components/footer-content";
import NewsPage from "./views/news-page";

export default {
  name: 'App',

  components: {
    NavBar,
    FooterContent,
    NewsPage
  },

  data: () => ({
    fab:false,
  }),

  methods:{

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

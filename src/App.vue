<template>
  <v-app>


    <v-main class="background">
      <router-view></router-view>

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
    </v-main>
    <footer-content></footer-content>
  </v-app>
</template>

<script>

import FooterContent from "./components/Footer";

export default {
  name: 'App',
  components: {
    FooterContent,
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
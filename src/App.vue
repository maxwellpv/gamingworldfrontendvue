<template>
  <v-app>
    <v-main class="background">
      <router-view></router-view>
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
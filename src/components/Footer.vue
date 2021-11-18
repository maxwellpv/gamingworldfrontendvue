<template>
  <v-footer class="primary" app>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-1 pa-2">
          {{$t('Footer')}}
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "footer-content"
}
</script>

<style scoped>

</style>

<i18n>
{
  "en": {
    "Footer": "Made by AW-Team"
  },

  "es": {
    "Footer": "Hecho por AW-Team"
  }
}

</i18n>
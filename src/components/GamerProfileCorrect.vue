<template>

  <v-content>
    <v-spacer></v-spacer>
    <div class="mt-16">
      <p class="white--text text-center">Thank you for completing your GamerProfile.</p>
      <p class="white--text text-center"> Stay up to date with what is happening by visiting the news section! </p>
    </div>
    <v-row align="center" justify="space-around" class="mt-7">
      <v-btn depressed color="primary" @click="showNewsPage" >
        Go News
      </v-btn>
    </v-row>
  </v-content>

</template>

<script>

export default {
  name: "GamerProfileCorrect",
  components: {},
  methods:{
    showNewsPage() {
      this.$router.push('News')
    }
  }
}
</script>

<style scoped>

</style>
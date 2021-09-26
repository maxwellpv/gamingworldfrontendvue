<template>
  <v-layout row wrap align-center filled>
    <v-flex xs8 offset-md2>


        <v-row >

          <template v-for="(article, index) in articles">

            <v-col :cols="index === 0 ? 12 : 6" :key="article.title">
              <v-card class="my-3" hover>
                <v-img height="350px" v-bind:src="article.urlToImage"></v-img>
                <v-container fill-height fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{article.title}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-text>
                  {{article.description}}
                </v-card-text>
                <v-card-actions>
                  <v-chip small color="secondary" class="white--text">
                    {{article.source.name}}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon class="red--text">
                    <v-icon small>mdi-reddit</v-icon>
                  </v-btn>
                  <v-btn small replace color="info" v-bind:href="article.url" target="_blank">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

          </template>

        </v-row>



    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: "main-content",
  props: {
    articles: Array
  },
}
</script>

<style scoped>

</style>
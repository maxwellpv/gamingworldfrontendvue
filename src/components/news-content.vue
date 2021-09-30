<template>
  <v-layout>
    <v-flex>
        <v-row >
          <template v-for="(article, index) in articles">
            <v-col :sm="12" :lg="index === 0 ? 12 : 6" :key="article.title">
              <v-card >
                <v-img height="350px" v-bind:src="article.urlToImage"></v-img>
                <v-container fluid>
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
                  <v-btn small replace color="primary" v-bind:href="article.url" target="_blank">Read More</v-btn>
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
  name: 'news-content',
  props: {
    articles: Array
  },
};
</script>

<style scoped>

</style>
<template>
  <v-container fluid class="ma-0">
    <h2>Reviews</h2>
    <v-card outlined class="pa-3 my-3 mr-3" v-for="(review, i) in reviews" :key="`review-${i}`">
      <p><small class="pb-2">{{review.timestamp}}</small></p>
       <v-rating
        class="ml-3"
        :value="review.rating"
        length="5"
        empty-icon="mdi-heart-outline"
        full-icon="mdi-heart"
        readonly
        size="20px"
        dense
        color="primary"
        background-color="secondary"
      ></v-rating>
      <v-card-text>
        <i>"{{review.feedback}}"</i>
        <br/>
        <br/>
        <small>Helped in categories:</small>
        <v-chip v-for="category of review.categories" :key="category"
          class="ma-2"
        >
          {{ category }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

/** @description Component to read reviews of a helper */
export default {
  name: "Reviews",
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>
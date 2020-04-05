<template>
  <v-container>
    <v-card>
      <v-card-title>Page not found</v-card-title>
      <v-card-actions>
        <v-btn class="mb-2 ml-2" color="primary" @click="$router.push('/')">Back to home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>
/** 
 * @description component that is displayed when route is not found
 * @TODO move text and translate
*/
export default {
  name: "PageNotFound"
}
</script>
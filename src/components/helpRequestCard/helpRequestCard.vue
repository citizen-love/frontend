<template>
  <div class="card--main--wrapper">
    <v-img class="white--text align-end" v-bind:src="snapshotSrc"></v-img>
    <div class="card--header--row">
      <div class="card--categories--box">
        <span v-for="item in limitedCategories" :key="item" class="card--category--element">{{item}}</span>
      </div>

      <v-card-subtitle>{{community}}</v-card-subtitle>
    </div>

    <div class="card--content-container">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ description }}</v-card-subtitle>
    </div>
    <v-btn color="primary" block x-large :to="{name: 'ReceiveHelp', query: { helpRequestId: id} }">{{ $t("index.cards_offer_help") }}</v-btn>
  </div>
</template>

<script>
const GOOGLE_API_KEY = "AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk";

export default {
  name: "HelpRequestCard",
  props: ["coordinates", "community", "category", "title", "description", "id"],
  data() {
    const snapshotSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${this.coordinates.latitude},${this.coordinates.longitude}&zoom=12&size=200x100&key=${GOOGLE_API_KEY}`;
    const limitedCategories = this.category.length > 3 ? [...this.category.filter((item, index) => index < 4), "More..."] : this.category
    return {
      snapshotSrc,
      limitedCategories
    };
  }
};
</script>


<style scoped lang="scss">
.card--main--wrapper {
  box-shadow: 1px 1px 3px #c0c0c0;
  height: 100%px;
  margin: 8px;
  display: grid;
  width: 350px;

}
.card--category--element {
  border: 1px solid #FA4659;
  color: #FA4659;
  padding: 6px;
  margin: 2px;
  border-radius: 4px;
}
.card--header--row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
}
.card--categories--box {
  display: flex;
  flex-wrap: wrap;
}
.card--content-container {
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: left;
}
</style>
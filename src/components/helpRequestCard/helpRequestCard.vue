<template>
  <div class="card--mobile" v-if="mobile">
    <v-img class="white--text align-end" v-bind:src="snapshotSrc"></v-img>
    <div class="card--mobile--row">
      <div class="card--mobile--categories">
        <span
          v-for="item in limitedCategories"
          :key="item"
          class="card--mobile--categories--element"
        >{{item}}</span>
      </div>

      <v-card-subtitle>{{community}}</v-card-subtitle>
    </div>

    <div class="card--mobile--content">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ description }}</v-card-subtitle>
    </div>
    <v-btn
      color="primary"
      block
      x-large
      :to="{name: 'ReceiveHelp', query: { helpRequestId: id} }"
    >{{ $t("index.cards_offer_help") }}</v-btn>
  </div>

  <div class="card--desktop" v-else>
    <img class="card--desktop--mapimage" v-bind:src="snapshotSrc"/>

    <div class="card--desktop--content">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{community}}</v-card-subtitle>
      <v-card-subtitle>{{ description }}</v-card-subtitle>
      <div class="card--desktop--actions">
        <div>
          <span
            v-for="item in limitedCategories"
            :key="item"
            class="card--desktop--categoryElement"
          >{{item}}</span>
        </div>
        <v-icon :to="{name: 'ReceiveHelp', query: { helpRequestId: id} }">mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
const GOOGLE_API_KEY = "AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk";

export default {
  name: "HelpRequestCard",
  props: [
    "coordinates",
    "community",
    "category",
    "title",
    "description",
    "id",
    "mobile"
  ],
  data() {
    const snapshotSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${this.coordinates.latitude},${this.coordinates.longitude}&zoom=10&size=240x160&key=${GOOGLE_API_KEY}`;
    const limitedCategories =
      this.category.length > 3
        ? [...this.category.filter((item, index) => index < 4), "More..."]
        : this.category;
    return {
      snapshotSrc,
      limitedCategories
    };
  }
};
</script>


<style scoped lang="scss">
.card--mobile {
  box-shadow: 1px 1px 3px #c0c0c0;
  height: 100%;
  margin: 8px;
  display: grid;
  width: 350px;
  &--row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px;
  }
  &--content {
    margin-top: 16px;
    margin-bottom: 16px;
    text-align: left;
  }
  &--categories {
    display: flex;
    flex-wrap: wrap;
    &--element {
      border: 1px solid #fa4659;
      color: #fa4659;
      padding: 6px;
      margin: 2px;
      border-radius: 4px;
    }
  }
}

.card--desktop {
  display: flex;
  border-bottom: 1px solid #d3d3d3;
  padding: 18px;
  padding-left: 0px;
  width: 75%;
  & > div {
    width: 100%;
  }
  &--content {
    text-align: left;
    display: grid;
  }
  &--categoryElement {
    font-size: 9px;
    line-height: 20px;
    letter-spacing: 0.25px;
    opacity: 0.6;
    padding-left: 16px;
  }
  &--actions {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-wrap: wrap;
      width: 50%;
    }
  }
}
</style>
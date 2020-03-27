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
    <v-btn color="primary" block x-large :to="`/help/${id}`">{{ $t("index.helpCardButton") }}</v-btn>
  </div>

  <div class="card--desktop" v-else @click="navigateToSingle">
    <img class="card--desktop--mapimage" v-bind:src="snapshotSrc" />

    <div class="card--desktop--content">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{community}}</v-card-subtitle>
      <v-card-subtitle>{{ trimmedDescription }}</v-card-subtitle>
      <div class="card--desktop--actions">
        <div>
          <span
            v-for="item in limitedCategories"
            :key="item"
            class="card--desktop--categoryElement"
          >{{item}}</span>
        </div>
        <v-btn color="primary" small :to="`/help/${id}`">{{ $t("index.helpCardButton") }}</v-btn>
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
    const previewedDescription = this.description.length > 250 ? this.description.slice(0, 125) : this.description;
    return {
      snapshotSrc,
      limitedCategories,
      trimmedDescription: `${previewedDescription} ...`
    };
  },
  methods: {
    navigateToSingle() {
      return this.$router.replace(`/help/${this.id}`);
    }
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
    padding: 16px;
    padding-bottom: 0;
  }
  &--content {
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
.card--desktop--mapimage {
  object-fit: cover;
  object-position: center;
}
.card--desktop {
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid #d3d3d3;
  padding: 18px;
  padding-left: 0px;
  min-height: 200px;
  height: 100%;
  width: 100%;
  & > div {
    width: 100%;
  }
  &--content {
    text-align: left;
    display: grid;
  }
  &--categoryElement {
    font-size: 12px;
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
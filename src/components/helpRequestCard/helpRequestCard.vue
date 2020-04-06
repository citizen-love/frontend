<template>
  <div class="card--mobile">
    <v-img class="white--text align-end" v-bind:src="snapshotSrc"></v-img>
    <div class="card--content">
      <div class="card--mobile--row">
        <div class="card--mobile--categories">
        <span
          v-for="item in limitedCategories"
          :key="item"
          class="card--mobile--categories--element"
        >{{item}}</span>
        </div>
        <span>{{community}}</span>
      </div>

      <div class="card--mobile--content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <v-btn color="primary" block x-large :to="`/help/${id}`">{{ $t("index.helpCardButton") }}</v-btn>
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

    &--row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--content {
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

  .card--content {
    padding:16px;
  }

</style>
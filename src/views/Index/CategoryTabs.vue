<template>
  <div class="">
    <v-item-group
      v-model="selected">
      <div
        v-for="category in categories"
        v-bind:key="category.key">
        <v-item
          class="category"
          v-slot:default="{ active, toggle }">
          <div @click="toggle">
            <v-icon color="primary">{{ category.icon }}</v-icon>
            <span>{{ category.displayName }}</span>
          </div>
        </v-item>
      </div>
    </v-item-group>
  </div>
</template>

<script>
  import categories from '../../utils/categories'

  export default {
    name: "Categories",
    data() {
      return {
        selected: [],
        categories: categories(this.$i18n)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";

  .category {
    text-align: center;
    padding: 30px 5px 20px 5px;
    border-bottom: 2px solid transparent;


    span {
      display: block;
    }

    .v-icon {
      display: block;
    }

    &.v-item--active{
      color: $_color_primary;
      border-bottom-color: $_color_primary;
    }
  }


  .v-item-group {
    display: flex;
    justify-content: space-around;
    background: #fafafa;
    cursor: pointer;
    border-bottom: 1px solid $_color_primary;
  }
</style>
<template>
  <div>
    <p> {{ this.$auth.user.email }}</p>
    <template v-for="(recipe,counter) in recipes">
      <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <recipe-card :recipe="recipe"></recipe-card>
      </div>
    </template>

  </div>
</template>

<script>
  import RecipeCard from "~/components/RecipeCard.vue";
  import {mapGetters, mapState} from "vuex";

  export default {
    name: "index.vue",
    data() {
      return {
        recipes: [],
        currentUser: {}
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
      });
      this.$axios.get('/api/recipe/getrecipes', {
          params: {
            id: this.$nuxt.$route.query.id
          }
        }
      ).then((resp) => {
        this.recipes = resp.data;
      });
    }, components: {
      RecipeCard
    },
  }
</script>

<style scoped>

</style>

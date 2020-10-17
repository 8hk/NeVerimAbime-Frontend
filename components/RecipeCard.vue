
<template>
  <div class="card recipe-card">
    <div class="card-body">
        <b-card :img-src="this.awsUrls+'/media/recipe_image/'+recipe.uuid+'.png'" img-alt="Card image" img-top>
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text">
      </p>
      <div class="action-buttons">
        <nuxt-link :to="`/recipeviewer/?uuid=${recipe.uuid}`" class="btn btn-sm btn-success"> View </nuxt-link>
      </div>
           </b-card>
    </div>
  </div>

</template>
<script>
import awsUrls from "../static/urls.json";

export default {
    props: ["recipe", "onDelete"],
    async mounted() {
      this.awsUrls= awsUrls.awsLink;
    },
    data() {
      return {
        awsUrls: ''
      }
    },
};
</script>
<style>
.recipe-card {
    box-shadow: 0 1rem 1.5rem rgba(0,0,0,.6);
}
</style>

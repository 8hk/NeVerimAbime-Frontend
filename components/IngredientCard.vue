<template>
  <b-card
    :header=ingredient.name
    tag="article"
    style="max-width: 20rem;"
    class="card ingredient-card"
    bg-variant="info"
    text-variant="white"
  >
    <b-card-text>
       <p> Total Amount(gr): {{ingredient.amount}}</p>
      <p>Nutrients: </p>
      </b-card-text>
    <b-card-text>
      <p v-for="(nutrient,counter) in ingredient.nutrients" v-if="counter<10">{{ nutrient.name }}</p>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
  export default {
    name: "IngredientCard",
    props: ["ingredient"]
  }
</script>

<style scoped>

</style>

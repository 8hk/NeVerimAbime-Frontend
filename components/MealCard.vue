<template>
  <b-card
    :header=meal.name
    tag="article"
    style="max-width: 20rem;"
    class="card meal-card"
    bg-variant="info"
    text-variant="white"
  >
    <b-card-text>
      <p> Total Amount(gr): {{meal.amount}}</p>
      <p> Price($): {{meal.price}}</p>
      <p> Description: {{meal.description}}</p>
    </b-card-text>

  </b-card>
</template>

<script>
  export default {
    name: "MealCard",
    props: ["meal"]
  }
</script>

<style scoped>

</style>

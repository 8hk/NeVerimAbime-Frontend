<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <recipecreation></recipecreation>
  </div>
</template>

<script>
  import recipecreation from "../components/recipecreation.vue"
  import UserNavbar from "../components/user-navbar";

  export default {
    name: "createrecipe",
    components: {
      recipecreation,UserNavbar
    }
  }
</script>

<style scoped>

</style>

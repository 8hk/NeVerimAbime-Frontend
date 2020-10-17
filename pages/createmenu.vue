<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <menucreation></menucreation>
  </div>
</template>

<script>
  import menucreation from "../components/menucreation.vue"
  import UserNavbar from "../components/user-navbar";

  export default {
    name: "createmenu",
    components: {
      menucreation, UserNavbar
    }
  }
</script>

<style scoped>

</style>

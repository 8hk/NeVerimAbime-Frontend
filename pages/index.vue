<template>
  <section class="container">
    <div>
<!--      <b-form>-->
<!--        <b-form-group description="Let us know your Email." label="Enter your Email" label-for="username">-->
<!--          <b-form-input id="username" v-model="form.username" type="email" required></b-form-input>-->
<!--        </b-form-group>-->
<!--        <b-form-group description="Let us know your Password." label="Enter your Password" label-for="pw">-->
<!--          <b-form-input id="pw" v-model="form.password" type="password"></b-form-input>-->
<!--        </b-form-group>-->
<!--        <b-button-group size="sm">-->
<!--          &lt;!&ndash;          <b-button @click="facebook" variant="outline-success">Facebook</b-button>&ndash;&gt;-->
<!--          <b-button @click="submit" variant="outline-success">Login</b-button>-->
<!--          &lt;!&ndash;          <b-button @click="google" variant="outline-success">Google</b-button>&ndash;&gt;-->
<!--          <b-button @click="logout" variant="outline-success">Logout</b-button>-->
<!--          <b-button @click="check" variant="outline-success">Check</b-button>-->
<!--          <b-button to="/callback" variant="outline-success">Callback</b-button>-->
<!--        </b-button-group>-->
<!--      </b-form>-->
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import axios from 'axios';

  export default {
    layout:'index',
    components: {
      Logo
    }
  }

</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>

<template>
  <div class="card user-card">
    <div class="card-body">
      <b-card :img-src="this.awsUrls+'/media/profile_image/'+user.uuid+'.png'" img-alt="User image"
              img-top>
        <h5 class="card-title">{{ user.username }}</h5>
        <p class="card-text">
        </p>
        <div class="action-buttons">
          <nuxt-link :to="`/user/?id=${user.id}`" class="btn btn-sm btn-success"> View</nuxt-link>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import awsUrls from 'static/urls.json'

  export default {
    props: ["user", "onDelete"],
    async mounted() {
      this.awsUrls= awsUrls.awsLink;
    },
    data() {
      return {
        awsUrls: ''
      }
    },

  }
</script>

<style scoped>
  .user-card {
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, .6);
  }
</style>

<template>
    <div>
        <div v-for="comment2 in this.allcomments">
            <b-card
                    :header=user.username
                    tag="article"
                    style="max-width: 20rem;"
                    class="card comment-card"
                    bg-variant="info"
                    text-variant="white"
            >
                <b-card-text>
                    {{comment2['comments_string']}}
                    <!--      {{comment}}-->
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentCard",
        props: ["comment"],
        async mounted() {
            // this.$nuxt.$loading.start();
            await this.$axios.get('/api/users/getuser/', {
                params: {
                    id: this.comment.commented_user
                }
            }).then((resp) => {
                // console.log("response user: " + resp);
                // console.log("response data user: " + resp.data);
                this.user = resp.data;
            });
            this.allcomments = this.comment['comments']

        },
        data() {
            return {
                user: {},
                comments: [],
                allcomments: []
            }
        }
    }
</script>

<style scoped>

</style>

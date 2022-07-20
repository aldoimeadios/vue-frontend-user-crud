<template>
  <h1 class="my-5">User Login</h1>
  <div class="alert alert-danger" v-if="error.type !== null">
      {{ error.message }}
  </div>
  <form @submit.prevent="submitLogin">
      <Login :user="user" />
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Login from '../components/Login';


export default {
    components: {
        Login
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
        }
    },
    computed: {
        disabled() {
        if (!this.user.email.includes("@")) {
            return true;
        }
        if (this.user.password.length > 7) {
            return false;
        }
        return true;
        },
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['loginUser']),
        submitLogin(){
            this.loginUser(this.user)
            this.user = {
                email: '',
                password: ''
            }
        },
    }
};
</script>

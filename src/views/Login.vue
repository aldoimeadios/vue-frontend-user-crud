<template>
  <h1 class="my-5">User Login</h1>
  <div class="alert alert-danger" v-if="error.type !== null">
      {{ error.message }}
  </div>
  <form @submit.prevent="submitLogin">
      <!-- <Login :user="user" /> -->
      <input 
        type="email" 
        placeholder="Email" 
        class="form-control my-2"
        v-model.trim="user.email"
    />
    <input 
        type="password" 
        placeholder="Password" 
        class="form-control my-2"
        v-model.trim="user.password"
    />
    <button 
        type="submit"
        class="btn btn-primary"
        :disabled="disabled"
    >
        Login
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Login from '../components/Login';

// const shortid = require('shortid');

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
        if (this.user.password.length > 5) {
            return false;
        }
        return true;
        },
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['loginUser']),
        submitLogin(){
            // this.user.id = shortid.generate()
            this.loginUser(this.user)
            this.user = {
                email: '',
                password: ''
            }
        },
    }
};
</script>

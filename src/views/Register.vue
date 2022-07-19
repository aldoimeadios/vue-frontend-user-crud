<template>
  <h1 class="my-5">User Register</h1>
  <form @submit.prevent="submitRegister">
      <!-- <Register :user="user" /> -->
    <input 
        type="text" 
        placeholder="Name" 
        class="form-control my-2"
        v-model.trim="user.name"
    />
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
    <input 
        type="password" 
        placeholder="Confirm Password" 
        class="form-control my-2"
        v-model.trim="confirm"
    />
    <button 
        type="submit"
        class="btn btn-primary"
        :disabled="disabled"
    >
        Register
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import Register from '../components/Register';

// const shortid = require('shortid');

export default {
    components: {
        Register
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            confirm: ''
        }
    },
    computed: {
        disabled() {
            if (!this.user.email.includes("@")) {
                return true;
            }
            if (this.user.name.length > 0 && this.user.password.length > 5 && this.user.password === this.confirm) {
                return false;
            }
            return true;
        },
    },
    methods: {
        ...mapActions(['registerUser']),
        submitRegister(){
            // this.user.id = shortid.generate()
            this.registerUser(this.user)
            this.user = {
                email: '',
                password: ''
            }
            this.confirm = ''
        },
    }
};
</script>

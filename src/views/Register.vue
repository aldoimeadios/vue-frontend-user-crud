<template>
  <h1 class="my-5">User Register</h1>
  <form @submit.prevent="submitRegister">
    <Register :user="user" />
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import Register from '../components/Register';


export default {
    components: {
        Register
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                phone: '',
                id_card: '',
                date_of_birth: '',
                city_code: ''
            },
            confirm: ''
        }
    },
    computed: {
        disabled() {
            if (!this.user.email.includes("@")) {
                return true;
            }
            if (this.user.name.length > 0 && this.user.password.length > 7 && this.user.password === this.confirm) {
                return false;
            }
            return true;
        },
    },
    methods: {
        ...mapActions(['registerUser']),
        submitRegister(){
            this.registerUser(this.user)
            this.user = {
                email: '',
                password: '',

            }
            this.confirm = ''
        },
    }
};
</script>

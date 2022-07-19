<template>
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
</template>

<script>
export default {
    props: {
        user: Object
    },
    data() {
        return {
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
};
</script>

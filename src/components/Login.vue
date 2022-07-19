<template>
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
</template>

<script>
export default {
    props: {
        user: Object,
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
    },
}
</script>


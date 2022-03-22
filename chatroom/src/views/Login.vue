<template>
    <div>
        <LoginForm></LoginForm>
    </div>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue"

export default {
    name: 'Login',
    data()
    {
        return {
            username: '',
        }
    },
    components: {
        LoginForm
    }
}
</script>

<style lang="sass">
    
</style>
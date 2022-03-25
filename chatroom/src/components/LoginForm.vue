<template>
<div>
    <h1 id="title">Quicke's Chatroom</h1>
    <input type="text" placeholder="Username" v-model="username" maxlength="16">
    <button @click="login">Connect</button>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import router from "../router"
import API from "../services/API"
import { app } from "../main"
export default defineComponent({
    data() {
        return {
            username: ""
        }
    },
    name: 'LoginForm',
    methods:
    {
        login()
        {
            if (this.username)
            {
                API.login(this.username)
                app.config.globalProperties.isAuthenticated = true
                router.push("/chatroom")
            }
        },
    }
})
</script>

<style lang="sass" scoped>
#title
    padding: 0
    margin: 0

div
    text-align: center
    border: 1px solid #FFF
    width: 350px
    
div > *
    display: block
    margin: auto
    margin-bottom: 20px
    margin-top: 20px

input
    width: 200px
    border: 1px solid #FFF
    padding: 5px

button
    border: 1px solid #FFF
    width: 150px
    padding: 10px
    background: #000
    color: #FFF

</style>

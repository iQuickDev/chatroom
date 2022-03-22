<template>
    <div>
        <div id="wrapper">
            <div id="messages">
                <ul>
                    <li v-for="(msg, i) in messages" :key="i">
                        <div class="info">
                            <span class="time">{{ msg.timestamp }}</span>
                            <span class="sender">{{ msg.sender }}</span>

                            <div class="content">
                                <span class="payload">{{ msg.payload }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div id="input">
                <form @submit="(e) => e.preventDefault()">
                <input type="text" placeholder="Type a message" v-model="message" />
                <button @click="send">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import API from "../services/API"
import { Message } from "../services/API"
import { app } from "../main"
import router from "../router"

export default defineComponent({
    data()
    {
        return {
            message: "",
            messages: [] as Message[]
        }
    },
    name: "Chat",
    methods:
    {
        send()
        {
            if (this.message)
                this.messages.push(API.sendMessage(this.message))
            this.message = ""
            this.scrollToBottom()
        },
        scrollToBottom()
        {
            const messages : any = document.getElementById("messages")
            messages.scrollTop = messages.scrollHeight
        }
    },
    mounted()
    {
        if (app.config.globalProperties.isAuthenticated)
        {
            API.socket.on("serverMessage", (msg: any) =>
            {
                console.log(msg)
                this.messages.push(msg)
                this.scrollToBottom()
            })
            return
        }

        router.push("/")
    }
})

</script>

<style lang="sass">
#messages
    position: absolute
    height: calc(100% - 35px)
    overflow-y: auto
    overflow-x: hidden
    padding: 5px
ul
    padding: 0
li
    list-style: none
    padding: 5px
    background: #444
    border: 1px solid #ccc
    margin-bottom: 5px
    min-width: 98vw
.time
    color: #ff0
    padding: 5px
    margin-right: 5px
.sender
    color: #0f0
    padding: 5px
    margin-right: 5px

.payload
    color: #fff
    padding: 5px
    margin-right: 5px
    word-break: break-word

.info
    display: block

#input
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    padding: 5px
    margin-top: 5px
    border-top: 1px solid #ccc
    border-bottom: 1px solid #ccc
    background: #444
    input
        width: 95%
        padding: 5px
        border: 1px solid #ccc
        background: #444
        color: #fff
        &:focus
            outline: none
    button
        padding: 5px
        margin-right: 5px
        border: 1px solid #ccc
        background: #444
        color: #fff
        &:focus
            outline: none
form
    width: 100%
    display: flex
</style>
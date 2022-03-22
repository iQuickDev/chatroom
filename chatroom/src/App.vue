<template>
<router-view/>
</template>

<script setup lang="ts">
import SocketManager from './services/API'
const API = new SocketManager()
</script>

<style lang="sass">
body
    background: #000
    color: #FFF
    padding: 0
    margin: 0
</style>

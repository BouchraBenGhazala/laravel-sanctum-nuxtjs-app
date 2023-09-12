<template>
    <div>
        <div class="spinner-grow text-light" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>{{title}}...
    </div>
</template>

<script>
    export default {
        name:'Loading',
        props:{
            title:String
        }
    }
</script>

<style>

</style>
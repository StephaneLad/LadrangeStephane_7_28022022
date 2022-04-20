<template>
<div class="d-flex bg-light mb-3 justify-content-around nav">
    <button class="btn bg-light " @click="aceuil">acceuil</button>
    <button class="btn bg-light " @click="profil">mon profil</button>
</div>
</template>

<script>
export default {
    methods:{
        aceuil(){
            document.location.href = `http://localhost:8080/#/creat`
        },
        profil(){
            document.location.href = `http://localhost:8080/#/user`
        }
    }
}
</script>


<style lang="scss" >
.nav{
    margin-top: -1em;
}
</style>
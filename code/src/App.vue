<template >
  <p class="w-100 bg-light"><img id="logo" class="bg-light" src="../public/logo.png" alt="logo groupomania"></p>
  <router-view/>
</template>

<script>
import cookieFormer from "@/service/cookieFormer";
export default {
  
}
try{
  let DataCookie=cookieFormer()
  if(DataCookie.token.length<1){
    document.location.href = `http://localhost:8080/#/log`
  }else{
    document.location.href = `http://localhost:8080/#/creat`
  }
}catch(err){
  document.location.href = `http://localhost:8080/#/log`
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo{
  height: 5.5em;
}
.all{
  background: #122441;
}

@media (max-width: 768px) {
  #logo{
    height: 3.5em;
  }
}
@media (max-width: 400px) {
  #logo{
    height: 2.5em;
  }
}
</style>

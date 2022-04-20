<template>
    <div class="login container bg-light rounded">
        <p @click="signup" id="sign" ref="signup" class="logOrSign">signup</p>
        <p @click="login" ref="login" class="logOrSign">login</p>       
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="emailEntry" labe>
        <label for="password">password</label>
        <input id="password" type="password" v-model="passwordEntry">
        <button class="btn-primary" @click="log">push</button>
    </div>
</template>



<script>
import axios from 'axios'
export default {
  data(){return{
      emailEntry:'',
      passwordEntry:'',
      sign: true
  }},
  methods:{
      signup(){
        this.sign=true
        this.$refs.signup.style.color='red'
        this.$refs.login.style.color='black'
      },
      login(){
          this.sign=false
          this.$refs.login.style.color='red'
          this.$refs.signup.style.color='black'
      },
      log(){

          if(this.sign===true){
            axios.post('http://localhost:3000/api/signup',{
            email:this.emailEntry,
            password:this.passwordEntry
           })
            .then(data=>{
                let date=(Date.now()+86400000)
                  document.cookie=`token=${data.data.token}; expires=${new Date(date).toString()}`
                  document.cookie=`userId=${data.data.userId}; expires=${new Date(date).toString()}`
                  document.cookie=`is_admin=${data.data.is_admin}; expires=${new Date(date).toString()}`
                  document.location.href = `http://localhost:8080/#/creat`
            })
            .catch(err=>console.log(err))
          }else{
              axios.post('http://localhost:3000/api/login',{
                  email:this.emailEntry,
                  password:this.passwordEntry
              })
              .then(data=>{
                  let date=(Date.now()+86400000)
                  document.cookie=`token=${data.data.token}; expires=${new Date(date).toString()}`
                  document.cookie=`userId=${data.data.userId}; expires=${new Date(date).toString()}`
                  document.cookie=`is_admin=${data.data.is_admin}; expires=${new Date(date).toString()}`
                  document.location.href = `http://localhost:8080/#/creat`
              })
              .catch(err=>console.log(err))
          }
      }
  }
}
</script>


<style lang="scss" scoped>
.logOrSign{
    font-size: 1.5em;
}
#sign{
    color: red;
}
.login{
    display: grid;
    grid-template-columns: repeat(2,50%);
    grid-template-rows: repeat(6,3em);
    grid-template-areas: 
    "signup login"
    "email email"
    "inputemail inputemail"
    "pass pass"
    "inputpass inputpass"
    "push push";

    width: 50%;
    margin: auto;
    border: 1px solid grey;
    border-radius: 3em;
    :nth-child(1){
        grid-area: signup;
        
    }
    :nth-child(2){
        grid-area: login;
        
    }
    :nth-child(3){
        grid-area: email;
    }
    :nth-child(4){
        grid-area: inputemail;
        width: 50%;
        margin: 0.8em 0 0.8em 25%;
    }
    :nth-child(5){
        grid-area: pass;
    }
    :nth-child(6){
        grid-area: inputpass;
        width: 50%;
        margin: 0.8em 0 0.8em 25%;
    }
    :nth-child(7){
        grid-area: push;
        width: 20%;
        margin: 0.5em 0 0.5em 40%;
    }
    
}
</style>
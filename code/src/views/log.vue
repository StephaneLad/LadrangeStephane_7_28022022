<template>
  <div class="login container bg-light rounded">
    <p @click="signup" id="sign" ref="signup" class="logOrSign">signup</p>
    <p @click="login" ref="login" class="logOrSign">login</p>
    <label for="email">Email:</label>
    <p class="error">{{this.errorEmailReturn}}</p>
    <input ref="email" id="email" type="email" v-model="emailEntry" labe />
    <label for="password">password</label>
    <p class="error">{{this.errorPasswordReturn}}</p>
    <input
      ref="password"
      id="password"
      type="password"
      v-model="passwordEntry"
    />
    <button class="btn-primary" @click="log">push</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      emailEntry: "",
      passwordEntry: "",
      sign: true,
      errorEmailReturn:"",
      errorPasswordReturn:"",
    };
  },
  methods: {
    signup() {
      this.sign = true;
      this.$refs.signup.style.color = "red";
      this.$refs.login.style.color = "black";
    },
    login() {
      this.sign = false;
      this.$refs.login.style.color = "red";
      this.$refs.signup.style.color = "black";
    },
    log() {
      const atMail = "@";
      this.errorEmailReturn=""
      this.errorPasswordReturn=""
      this.$refs.password.style.background = "#FFFFFF";
      this.$refs.email.style.background = "#FFFFFF";

      if (this.emailEntry.length > 5 && this.emailEntry.includes(atMail)) {
        if (this.passwordEntry.length < 5) {
          this.errorPasswordReturn="Mot de passe trop court"
          this.$refs.password.style.background = "#ffa8a8";
          return;
        }
        if (this.sign === true) {
          axios
            .post("http://localhost:3000/api/signup", {
              email: this.emailEntry,
              password: this.passwordEntry,
            })
            .then((data) => {
              let date = Date.now() + 86400000;
              document.cookie = `token=${data.data.token}; expires=${new Date(
                date
              ).toString()}`;
              document.cookie = `userId=${data.data.userId}; expires=${new Date(
                date
              ).toString()}`;
              document.cookie = `is_admin=${
                data.data.is_admin
              }; expires=${new Date(date).toString()}`;
              document.location.href = `http://localhost:8080/#/creat`;
            })
            .catch((err) => {
              console.log(err)
              this.errorEmailReturn="Email déja utilisé"
              this.$refs.email.style.background = "#ffa8a8";
            });
        } else {
          axios
            .post("http://localhost:3000/api/login", {
              email: this.emailEntry,
              password: this.passwordEntry,
            })
            .then((data) => {
              let date = Date.now() + 86400000;
              document.cookie = `token=${data.data.token}; expires=${new Date(
                date
              ).toString()}`;
              document.cookie = `userId=${data.data.userId}; expires=${new Date(
                date
              ).toString()}`;
              document.cookie = `is_admin=${
                data.data.is_admin
              }; expires=${new Date(date).toString()}`;
              document.location.href = `http://localhost:8080/#/creat`;
            })
            .catch((err)=> {
              console.log(err.response.data)
              if(err.response.data.passwordError){
                this.errorPasswordReturn="Mot de passe invalide"
              this.$refs.password.style.background = "#ffa8a8";
              }else{
                this.errorEmailReturn="Emai inconnue"
              this.$refs.email.style.background = "#ffa8a8";
              }
            });
        }
      }
      else{
        this.errorEmailReturn="Email invalide"
        this.$refs.email.style.background = "#ffa8a8";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logOrSign {
  font-size: 1.5em;
}
#sign {
  color: red;
}
.error{
  color: darkred
}
.login {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 3em 2em 1.5em 3em 2em 1.5em 3em 3em;
  grid-template-areas:
    "signup login"
    "email email"
    "errorEmail errorEmail"
    "inputemail inputemail"
    "pass pass"
    "errorPassword errorPassword"
    "inputpass inputpass"
    "push push";

  width: 50%;
  margin: auto;
  border: 1px solid grey;
  border-radius: 3em;
  :nth-child(1) {
    grid-area: signup;
  }
  :nth-child(2) {
    grid-area: login;
  }
  :nth-child(3) {
    grid-area: email;
  }
  :nth-child(4) {
    grid-area: errorEmail;
  }
  :nth-child(5) {
    grid-area: inputemail;
    width: 50%;
    margin: 0.8em 0 0.8em 25%;
  }
  :nth-child(6) {
    grid-area: pass;
  }
  :nth-child(7) {
    grid-area: errorPassword;
  }
  :nth-child(8) {
    grid-area: inputpass;
    width: 50%;
    margin: 0.8em 0 0.8em 25%;
  }
  :nth-child(9) {
    grid-area: push;
    width: 20%;
    margin: 0.5em 0 0.5em 40%;
  }
}

@media (max-width: 964px) {
  .login {
    width: 100%;

    :nth-child(5) {
      grid-area: inputemail;
      width: 80%;
      margin: 0.8em 0 0.8em 10%;
    }
    :nth-child(8) {
      grid-area: inputpass;
      width: 80%;
      margin: 0.8em 0 0.8em 10%;
    }
  }
}
</style>

<template>
  <navig />
  <div class="bg-light p-2 container rounded d-flex flex-column justify-content-center align-items-center">
    <img v-bind:src="'https://avatars.dicebear.com/api/initials/' + user.user_name + '.svg'" alt="image de profil" class="imgProfil"/>
    <label for="pseudoUpdate">Pseudo:</label>
    <input id="pseudoUpdate" type="text" v-model="userModifier" v-bind:placeholder="user.user_name"/>
    <label for="emailUpdate">Email:</label>
    <input id="emailUpdate" type="email" v-bind:placeholder="user.email" v-model="emailModifier"/>
    <label for="passwordUpdate">Password:</label>
    <input type="password" name="password" id="passwordUpdate" placeholder="PASSWORD" v-model="passwordModifier"/>
    <button class="btn btn-primary my-2" @click="modifProfil">Modifier</button>
    <button class="btn btn-danger my-2" @click="deleteUser">Suprimer</button>
    <button class="btn btn-secondary my-2" @click="disconect">Déconecter</button>
  </div>
  <div>
    <post :listedata="post" />
  </div>
</template>

<script>
// @ is an alias to /src
import navig from "@/components/menu.vue";
import post from "@/components/post.vue";
import cookieFormer from "@/service/cookieFormer";
import axios from "axios";

export default {
  name: "poster",
  components: {
    post,
    navig,
  },
  data() {
    return {
      user: "",
      passwordModifier: "",
      userModifier: "",
      emailModifier: "",
      post: "",
    };
  },
  mounted() {
    try{
    let DataCookie=cookieFormer()
    if(DataCookie.token.length<1){
      document.location.href = `http://localhost:8080/#/log`
    }
    let id = { id_user: DataCookie.user_id };
    axios({
      method: "post",
      url: "http://localhost:3000/api/post/getAllUser",
      data: id,
      headers: { Authorization: `Bearer ${DataCookie.token}` },
    })
      .then((data) => {
        console.log(data);
        this.post = data.data.post;
        this.user = data.data.mainUser.user;
      })
      .catch((err) => console.log(err));
    }catch(err){
    document.location.href = `http://localhost:8080/#/log`
    }
  },
  methods: {
    modifProfil() {
      let DataCookie = cookieFormer();
      const atMail = "@"
      let newEmail=''
      let newPassword=''
      let newUserName=''
      if(this.emailModifier.length>5 && this.emailModifier.includes(atMail)){
        newEmail = this.emailModifier
      }
      if(this.passwordModifier.length>5){
        newPassword = this.passwordModifier
      }
      if(this.userModifier.length>5){
        newUserName=this.userModifier
      }
      axios({
        method: "post",
        url: "http://localhost:3000/api/update",
        data: {
          id_user: parseInt(DataCookie.user_id),
          user_name: newUserName,
          email: newEmail,
          password: newPassword,
        },
        headers: { Authorization: `Bearer ${DataCookie.token}` },
      })
        .then(location.reload())
        .catch((err) => console.log(err));
    },
    deleteUser() {
      let DataCookie = cookieFormer();

      axios({
        method: "post",
        url: "http://localhost:3000/api/delete",
        data: {
          id_user: DataCookie.user_id,
        },
        headers: { Authorization: `Bearer ${DataCookie.token}` },
      })
        .then(() => {
          document.cookie = `token=; expires=${new Date(1).toString()}`;
          document.cookie = `userId=; expires=${new Date(1).toString()}`;
          document.cookie = `is_admin=; expires=${new Date(1).toString()}`;
          location.reload();
        })
        .catch((err) => console.log(err));
    },
    disconect() {
      document.cookie = `token=; expires=${new Date(1).toString()}`;
      document.cookie = `userId=; expires=${new Date(1).toString()}`;
      document.cookie = `is_admin=; expires=${new Date(1).toString()}`;
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.imgProfil {
  height: 15em;
}
</style>

<template>
<div v-for="post in listedata">
  <section class="post container bg-light rounded d-flex flex-column flex-md-row h-100 my-3">
    <div class="col-md-2 d-flex flex-column justify-content-around">
      <div class="user my-2">
        <img  v-bind:src="'https://avatars.dicebear.com/api/initials/'+post.user_name+'.svg'" alt="image de profil" class="profilImg h-20 p-0" />
        <p>{{post.user_name}}</p>
      </div>
      <div class="d-flex justify-content-around mx-2">
        <p class="col-10">{{ post.post.createdAt}}</p>
      </div>
      <div v-if="this.userId==post.post.id_user || is_admin==true" id="buton" class="d-flex flex-md-column">
        <button class="btn modifierButton rounded m-1" @click="update(post.post.id_post)">modify</button>
        <button class="btn deleteButton rounded m-1" @click="supp(post.post.id_post)">delete</button>
      </div>
    </div>
    <div class=" col-md-10 d-flex flex-column textpost ">
      <img v-bind:src="post.post.url_img_post" alt="" class="postImg p-2" />
      <div class="col-12 d-flex flex-column">
        <p class="postcontent">{{ post.post.text_content }}</p>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
import cookieFormer from "@/service/cookieFormer";
export default {
  name: "poster",
  props: [
    'listedata'
  ],
  data() {
    let DataCookie=cookieFormer()
    return {
      userId:DataCookie.user_id,
      is_admin:DataCookie.is_admin
    };
  },
  methods: {
    supp(id){
      let DataCookie=cookieFormer()

      let postDelete = new FormData()
      postDelete.append('id_post',id)
      postDelete.append('id_user',DataCookie.user_id)

      axios({
        method:'post',
        url:'http://localhost:3000/api/post/delete',
        data:postDelete,
        headers:{'Content-Type': 'application/json',Authorization: `Bearer ${DataCookie.token}`}
      })
      .then(location.reload())
      .catch(err=>console.log(err))
    },
    update(id){
      document.location.href = `http://localhost:8080/#/updt?idpost=${id}`
    }
  },
};

</script>


<style lang="scss" >
.deleteButton{
  background-color: #ffa8a8;
}
.modifierButton{
  background-color: #ffd557;
}
.postcontent {
  height: 10em;
  width: 100%;
  word-break: normal;
  overflow: scroll;
}
.profilImg {
  height: 10em;
  
}
.postImg {
  height: 300px;
  object-fit: contain;
  object-position: center;
}
.post {
  height: 20em;
}
.textpost{
  height: 30em;
}
#buton{
  display: flex;
  margin:0 auto 0 auto
}
@media (max-width: 1200px) {
  .profilImg {
  height: 7em;
  }
}
@media (max-width: 768px) {
  .postImg {
  height: 200px;
  object-fit: contain;
  object-position: center;
  }
  .user{

  }
  .profilImg {
  height: 4em;
  }

}

</style>
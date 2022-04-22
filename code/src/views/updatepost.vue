<template>
  <navig/>
  <div id="maincontent" class="creator container bg-light rounded d-inline-block px-3 py-1">
    <div>
      <form id="formupdate" class="d-flex flex-column">
      <label for="updatepost" class="">modifier:</label>
      <input id="updatepost" class="textpost p-4" type="text" v-model="postContent" />
      <div class="d-flex flex-md-row flex-column m-3">
        <label for="fileupdate" class="col-1 my-md-2">fichier:</label>
        <input class="btn col-md-6" type="file" ref="userFile" id="fileupdate" />
        <button class="btn btn-primary col-md-4" @click="pushPost">push</button>
      </div>
      </form>
    </div>
    
  </div>
  <div >
      <post :listedata='post'/>
    </div>
</template>


<script>
import post from "@/components/post.vue";
import navig from "@/components/menu.vue";
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
      post:'',
      postContent:null
    };
  },
  beforeCreate(){
    let url = document.location.href
    let id=url.slice(36)
    try{
    let DataCookie=cookieFormer()
    if(DataCookie.token.length<1){
      document.location.href = `http://localhost:8080/#/log`
    }

    let geter = {id_post:id,id_user:DataCookie.user_id}
    axios({
        method:'post',
        url:'http://localhost:3000/api/post/getOne',
        data:geter,
        headers:{Authorization: `Bearer ${DataCookie.token}`}
    })
    .then(data=>{
      this.post=data.data.post
    })
    .catch(err=>console.log(err))
    }catch(err){
    document.location.href = `http://localhost:8080/#/log`
    }
  },
  methods:{
    pushPost() {
      event.preventDefault();
      let url = document.location.href
      let id=url.slice(36)
      let postUpdate = new FormData()

      let file= document.getElementById('fileupdate').files[0]
      if(file!==undefined){
        postUpdate.append('file',file)
      }
      
      if(this.postContent!==null){
        postUpdate.append('postContent',`${this.postContent}`)
      }
  


    let DataCookie=cookieFormer()

      postUpdate.append('userId',DataCookie.user_id)
      postUpdate.append('id_post',id)

    axios({
      method:'post',
      url:'http://localhost:3000/api/post/update',
      data:postUpdate,
      headers:{'Content-Type': 'application/json',Authorization: `Bearer ${DataCookie.token}`}
    })
    .then(location.reload())
    .catch(err=>console.log(err))

  },
  }

}
</script>

<style lang="scss" scoped>
.textpost {
  height: 5em;
  margin: 1em;
}
@media (max-width: 768px) {
  .textpost {
  height: 5em;
  margin: 0.5em;
  }
}
</style>
<template>
  <navig/>
  <div id="maincontent" class="container bg-light rounded d-inline-block px-3 py-1">
    <div>
      <form id="formpost" class="d-flex flex-column">
      <label for="newpost" class="">Post:</label>
      <input id="newpost" class="textpost p-4" type="text" v-model="postContent" />
      <div class="d-flex flex-md-row flex-column m-3">
        <label for="fileupload" class="col-1 my-md-2">fichier:</label>
        <input class="btn col-md-6" type="file" ref="userFile" id="fileupload" />
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
      postContent: "",
      post:'',
    };
  },
  async beforeCreate(){
    try{
    let DataCookie=cookieFormer()
    if(DataCookie.token.length<1){
      document.location.href = `http://localhost:8080/#/log`
    }
    await axios({
      method:'get',
      url:'http://localhost:3000/api/post/getAll',
      headers:{Authorization: `Bearer ${DataCookie.token}`}
    })
    .then(data=>{
      this.post=data.data.post
      this.userId=DataCookie.user_id
    })
    .catch(err=>console.log(err))
    }catch(err){
    document.location.href = `http://localhost:8080/#/log`
    }
  },
  methods: {
    pushPost() {
      event.preventDefault();
      let file= document.getElementById('fileupload').files[0]

      let DataCookie=cookieFormer()

      let postCreate = new FormData()
      postCreate.append('postContent',`${this.postContent}`)
      postCreate.append('file',file)
      postCreate.append('userId',DataCookie.user_id)
      
    axios({
      method:'post',
      url:'http://localhost:3000/api/post/create',
      data:postCreate,
      headers:{'Content-Type': 'application/json',Authorization: `Bearer ${DataCookie.token}`}
    })
    .then(location.reload())
    .catch(err=>console.log(err))
  }
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
<template>
  <div class="mt-5">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h4>Add Project</h4>
        <NuxtLink to="/" class="btn btn-danger">Back</NuxtLink>
      </div>
      <div class="card-body">
        <div v-if="isLoading">
          <Loading :title="isLoadingTitle" />
        </div>
        <div v-else>
          <form @submit.prevent="saveProject">
            <div class="mb-3">
              <label for="title">Title</label>
              <input type="text" class="form-control" v-model="Project.title">
            </div>
            <div class="mb-3">
              <label for="description">Description</label>
              <input type="text" class="form-control" v-model="Project.description">
            </div>
            <div class="mb-3">
              <label for="slug">Slug</label>
              <input type="text" class="form-control" v-model="Project.slug">
            </div>
            <div class="mb-3">
              <label for="status">Status</label>
              <input type="text" class="form-control" v-model="Project.status">
            </div>
            <div class="mb-3">
              <label for="url">Url</label>
              <input type="text" class="form-control" v-model="Project.url">
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from "vue";
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);


export default {
  data() {
    return {
      Project: {
        title: '',
        description: '',
        slug: '',
        status: '',
        url: ''
      },
      isLoading: false,
      isLoadingTitle: 'Loading',
      token: ''
    };
  },

  created() {
    this.token = VueCookie.get("XSRF-TOKEN");
    console.log(this.token)
  },

  methods: {
    saveProject() {

      let headers = {
        headers: {
          'X-XSRF-TOKEN': this.token
        }
      }
      console.log(headers);
      axios.post("http://localhost:8000/api/projets", this.Project, headers)
        .then(res => console.log(res));
    }
  }

  // async saveProject(){

  //     this.isLoading = true;
  //     this.isLoadingTitle = 'Saving';

  //     const url ='http://localhost:8000/api/projets'


  //     const data = {...this.Project,}
  //     const res = await this.$axios.$post(url,data)
  //     if(res){
  //           this.isLoading = false;
  //           this.isLoadingTitle = 'Loading';
  //       alert('Project created successfully')

  //       this.Project.title = '';
  //       this.Project.description = '';
  //       this.Project.slug = '';
  //       this.Project.url = '';
  //       this.Project.status = '';
  //     }
  //     else{
  //       alert('Error creating project')
  //     }

  // }
};
</script>

<style scoped>
.mt-5 {
  padding: 20px;
}
</style>

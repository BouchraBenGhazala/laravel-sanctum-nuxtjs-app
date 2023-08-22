<template>
  <div class="mt-5">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h4>Add Project</h4>
        <NuxtLink to="/" class="btn btn-danger">Back</NuxtLink>
      </div>
      <div class="card-body">
        <div v-if="isLoading">
          <Loading :title="isLoadingTitle"/>
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
      isLoadingTitle: 'Loading'
    };
  },
  methods: {
    saveProject() {
      let token = document.head.querySelector('meta[name="csrf-token"]');

      if (token) {
          window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
      } else {
          console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
      }
      
      axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

      this.isLoading = true;
      this.isLoadingTitle = 'Saving';

      // Storing data using Laravel API with the help of axios
      axios.post('http://localhost:8000/api/projets', this.Project).then(res => {
        console.log(res.data.message);
        alert(res.data.message);
        this.isLoading = false;
        this.isLoadingTitle = 'Loading';

        this.Project.title = '';
        this.Project.description = '';
        this.Project.slug = '';
        this.Project.url = '';
        this.Project.status = '';
      });
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
  }
};
</script>

<style scoped>
.mt-5 {
  padding: 20px;
}
</style>

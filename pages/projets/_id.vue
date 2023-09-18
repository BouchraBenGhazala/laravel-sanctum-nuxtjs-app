<template>
  <div class="mt-5" v-if="AdminUser">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h4 class="fs-5 fw-normal">Edit Project</h4>
        <NuxtLink to="/projets" class="btn btn-danger">Back</NuxtLink>
      </div>
      <div class="card-body">
        <!-- {{ this.errorList }} -->
        <div v-if="isLoading">
          <Loading :title="isLoadingTitle" />
        </div>
        <div v-else>
          <form @submit.prevent="updateProject">
            <div class="mb-3">
              <label for="title">Title</label>
              <input type="text" class="form-control" v-model="Project.title">
              <span class="text-danger" v-if="this.errorList.title">{{ this.errorList.title[0]}}</span>
            </div>
            <div class="mb-3">
              <label for="description">Description</label>
              <input type="text" class="form-control" v-model="Project.description">
              <span class="text-danger" v-if="this.errorList.description">{{ this.errorList.description[0]}}</span>
            </div>
            <div class="mb-3">
              <label for="slug">Slug</label>
              <input type="text" class="form-control" v-model="Project.slug">
              <span class="text-danger" v-if="this.errorList.slug">{{ this.errorList.slug[0]}}</span>
            </div>
            <div class="mb-3">
              <label for="status">Status</label>
              <input type="text" class="form-control" v-model="Project.status">
              <span class="text-danger" v-if="this.errorList.status">{{ this.errorList.status[0]}}</span>
            </div>
            <div class="mb-3">
              <label for="url">Url</label>
              <input type="text" class="form-control" v-model="Project.url">
              <span class="text-danger" v-if="this.errorList.url">{{ this.errorList.url[0]}}</span>
            </div>
            <label for="technologies">Technologies</label>
              <b-field>
                <b-select
                  v-model="selectedTechnologies"
                  multiple
                  expanded
                  placeholder="Select technologies"
                >
                  <option v-for="technologie in Technologie" :key="technologie.id" :value="technologie.id">
                    {{ technologie.name }}
                  </option>
                </b-select>
              </b-field>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="alert alert-danger mt-3" role="alert">
  Sorry! Only admins can update projects.
</div>
  </template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      ProjectId:'',
      Project: {
        title: '',
        description: '',
        slug: '',
        status: '',
        url: ''
      },
      selectedTechnologies: [], // Array to store selected technology IDs
      Technologie:[],
      isLoading: false,
      isLoadingTitle: 'Loading',
      errorList:{},
      Users:{},
      user: this.$auth.user.data,
      AdminUser: null,

    }
  },
  mounted(){
    this.ProjectId= this.$route.params.id;
    // alert(this.ProjectId)
    this.getProject(this.ProjectId);
    this.fetchTechnologies(); 
    this.getUsers();

  },
  methods: {
    getProject(ProjectId){

      this.isLoading=true;
      axios.get(`http://localhost:8000/api/projets/${ProjectId}/edit`).then(res=>{

          this.isLoading =false,
          this.Project=res.data.message;
          console.log("data:");
          console.log(res)
      });
    },

    updateProject() {
      this.isLoading =true,
      this.isLoadingTitle="Updating";
      
      var myThis=this;

      axios.put(`http://localhost:8000/api/projets/${this.ProjectId}/update`, {'project': this.Project, 'selectedTechnologies' : this.selectedTechnologies}, {withCredentials:true})
        .then(res => {
          console.log(res,'res');
          alert(res.data.message);

          this.Project.title = '';
          this.Project.description = '';
          this.Project.slug = '';
          this.Project.url = '';
          this.Project.status = '';
          this.selectedTechnologies={};

          this.isLoading=false;
          this.isLoadingTitle="Loading";

        }).catch(function(error){
          console.log(error,'error')
          if(error.response){
            if(error.response.status==404){
              myThis.errorList= error.response.data.errors;
            }
          }
          myThis.isLoading=false;
        });
    },
    async fetchTechnologies() {
            try {
                const response = await axios.get("http://localhost:8000/api/technologies"); // Adjust the API endpoint URL
                this.Technologie = response.data.message; // Assuming roles data is returned as an array in the 'message' field

            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        },
        getUsers(){
                axios.get("http://localhost:8000/api/users").then(res=>{

                    this.isLoading =false,
                    this.Users=res.data.message;
                    console.log("data:");
                    console.log(res);

                    this.AdminUser = this.Users.find(user => {
                    return user.id === this.user.id && user.role.name === 'admin';
                });
            });
            },
  }

 
};
</script>
  
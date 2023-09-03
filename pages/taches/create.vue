<template>
    <div class="mt-5">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="fs-5 fw-normal">Add Task</h4>
          <NuxtLink to="/taches" class="btn btn-danger">Back</NuxtLink>
        </div>
        <div class="card-body">
          <!-- {{ this.errorList }} -->
          <div v-if="isLoading">
            <Loading :title="isLoadingTitle" />
          </div>
          <div v-else>
            <form @submit.prevent="saveTask">
              <div class="mb-3">
                <label for="title">Title</label>
                <input type="text" class="form-control" v-model="Task.title">
                <span class="text-danger" v-if="this.errorList.title">{{ this.errorList.title[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">Description</label>
                <input type="text" class="form-control" v-model="Task.description">
                <span class="text-danger" v-if="this.errorList.description">{{ this.errorList.description[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="slug">Priority</label>
                <input type="text" class="form-control" v-model="Task.priority">
                <span class="text-danger" v-if="this.errorList.priority">{{ this.errorList.slug[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="status">Type</label>
                <input type="text" class="form-control" v-model="Task.type">
                <span class="text-danger" v-if="this.errorList.type">{{ this.errorList.status[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="url">Due date</label>
                <input type="text" class="form-control" v-model="Task.due_date">
                <span class="text-danger" v-if="this.errorList.due_date">{{ this.errorList.url[0]}}</span>
              </div>
              <b-field label="User" class="mb-5">
              <b-select placeholder="Select a user" v-model="Task.user_id" expanded>
                  <option v-for="user in User" :key="user.id" :value="user.id">{{ user.name }}</option>
              </b-select>
          </b-field>
          <b-field label="Project" class="mb-5">
              <b-select placeholder="Select a projet" v-model="Task.projet_id" expanded>
                  <option v-for="project in Projet" :key="project.id" :value="project.id">{{ project.title }}</option>
              </b-select>
          </b-field>
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
        Task: {
          title: '',
          description: '',
          priority: '',
          type: '',
          due_date: '',
          user_id:'',
          projet_id:''
        },
        User:[],
        Projet:[],
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{}
  
      }
    },
    mounted(){
      this.fetchUsers(); 
      this.fetchProjets(); 
    },
    methods: {
      async saveTask() {
        this.isLoading=true;
        this.isLoadingTitle="Saving";
  
        var myThis=this;
  
        await axios.post("http://localhost:8000/api/tasks", this.Task, {withCredentials:true})
          .then(res => {
            console.log(res,'res');
            alert(res.data.message);
  
            this.Task.title = '';
            this.Task.description = '';
            this.Task.priority = '';
            this.Task.type = '';
            this.Task.due_date = '';
            this.Task.user_id= '';
            this.Task.projet_id = '';
  
            this.isLoading=false;
            this.isLoadingTitle="Loading";
  
          }).catch(function(error){
            console.log(error,'error')
            if(error.response){
              if(error.response.status==422){
                myThis.errorList= error.response.data.errors;
              }
            }
            myThis.isLoading=false;
          });
      },
      async fetchUsers() {
            try {
                const response = await axios.get("http://localhost:8000/api/users"); // Adjust the API endpoint URL
                this.User = response.data.message; // Assuming roles data is returned as an array in the 'message' field

            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
        
      async fetchProjets() {
            try {
                const response = await axios.get("http://localhost:8000/api/projets"); // Adjust the API endpoint URL
                this.Projet= response.data.message; // Assuming roles data is returned as an array in the 'message' field

            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
    }
  
   
  };
  </script>
  
  <style scoped>
  .mt-5 {
    padding: 20px;
  }
  </style>
  
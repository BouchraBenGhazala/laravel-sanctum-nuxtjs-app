<template>
    <div class="mt-5">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="fs-5 fw-normal">Edit User</h4>
          <NuxtLink to="/users" class="btn btn-danger">Back</NuxtLink>
        </div>
        <div class="card-body">
          <!-- {{ this.errorList }} -->
          <div v-if="isLoading">
            <Loading :title="isLoadingTitle" />
          </div>
          <div v-else>
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="title">Name</label>
                <input type="text" class="form-control" v-model="User.name">
                <span class="text-danger" v-if="this.errorList.title">{{ this.errorList.title[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">Email</label>
                <input type="text" class="form-control" v-model="User.email">
                <span class="text-danger" v-if="this.errorList.description">{{ this.errorList.description[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="slug">Password</label>
                <input type="text" class="form-control" v-model="User.password">
                <span class="text-danger" v-if="this.errorList.slug">{{ this.errorList.priority[0]}}</span>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary">Update</button>
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
        UserId:'',
        User: {
          name: '',
          email: '',
          password: '',
        },
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{}
  
      }
    },
    mounted(){
      this.UserId= this.$route.params.id;
      // alert(this.ProjectId)
      this.getUser(this.UserId);
  
    },
    methods: {
      getUser(UserId){
  
        this.isLoading=true;
        axios.get(`http://localhost:8000/api/users/${UserId}/edit`).then(res=>{
  
            this.isLoading =false,
            this.User=res.data.message;
            console.log("data:");
            console.log(res)
        });
      },
  
      updateUser() {
  
        this.isLoading =true,
        this.isLoadingTitle="Updating";
  
        var myThis=this;
  
        axios.put(`http://localhost:8000/api/users/${this.UserId}/update`, this.User, {withCredentials:true})
          .then(res => {
            console.log(res,'res');
            alert(res.data.message);
  
            this.User.name = '';
            this.User.email = '';
            this.User.password = '';

  
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
      }
    }
  
   
  };
  </script>
    
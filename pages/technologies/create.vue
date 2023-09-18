<template>
    <div class="mt-5" v-if="AdminUser">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="fs-5 fw-normal">Add Technologie</h4>
          <NuxtLink to="/technologies" class="btn btn-danger">Back</NuxtLink>
        </div>
        <div class="card-body">
          <!-- {{ this.errorList }} -->
          <div v-if="isLoading">
            <Loading :title="isLoadingTitle" />
          </div>
          <div v-else>
            <form @submit.prevent="saveTechnologie">
              <div class="mb-3">
                <label for="title">Name</label>
                <input type="text" class="form-control" v-model="Technologie.name">
                <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0]}}</span>
              </div>
          <div class="mb-3">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-danger mt-3" role="alert">
  Sorry! Only admins can create technologies.
</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        Technologie: {
          name: '',
 
        },
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{},
        Users:{},
        user: this.$auth.user.data,
        AdminUser: null,
  
      }
    },
    mounted(){
      this.getUsers();
    },
    methods: {
      async saveTechnologie() {
        this.isLoading=true;
        this.isLoadingTitle="Saving";
  
        var myThis=this;
  
        await axios.post("http://localhost:8000/api/technologies", this.Technologie, {withCredentials:true})
          .then(res => {
            console.log(res,'res');
            alert(res.data.message);
  
            this.Technologie.name = '';
    
  
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
  
  <style scoped>
  .mt-5 {
    padding: 20px;
  }
  </style>
  
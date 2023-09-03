<template>
    <div class="mt-5">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="fs-5 fw-normal">Edit Technologie</h4>
          <NuxtLink to="/technologies" class="btn btn-danger">Back</NuxtLink>
        </div>
        <div class="card-body">
          <!-- {{ this.errorList }} -->
          <div v-if="isLoading">
            <Loading :title="isLoadingTitle" />
          </div>
          <div v-else>
            <form @submit.prevent="updateTechnologie">
              <div class="mb-3">
                <label for="title">Name</label>
                <input type="text" class="form-control" v-model="Technologie.name">
                <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0]}}</span>
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
        TechnologieId:'',
        Technologie: {
          name: '',
        },
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{}
  
      }
    },
    mounted(){
      this.TechnologieId= this.$route.params.id;
      // alert(this.ProjectId)
      this.getTechnologie(this.TechnologieId);


  
    },
    methods: {
      getTechnologie(TechnologieId){
  
        this.isLoading=true;
        axios.get(`http://localhost:8000/api/technologies/${TechnologieId}/edit`).then(res=>{
  
            this.isLoading =false,
            this.Technologie=res.data.message;
            console.log("data:");
            console.log(res)
        });
      },
  
      updateTechnologie() {
  
        this.isLoading =true,
        this.isLoadingTitle="Updating";
  
        var myThis=this;
  
        axios.put(`http://localhost:8000/api/technologies/${this.TechnologieId}/update`, this.Technologie, {withCredentials:true})
          .then(res => {
            console.log(res,'res');
            alert(res.data.message);
  
            this.Technologie.name = '';
  
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



    }
  
   
  };
  </script>
    
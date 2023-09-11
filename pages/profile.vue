<template>
    <div class="mt-5">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="fs-5 fw-normal">Edit Profile</h4>
          <NuxtLink to="/" class="btn btn-danger">Back</NuxtLink>
        </div>
        <div class="card-body">
          <div v-if="isLoading">
            <Loading :title="isLoadingTitle" />
          </div>
          <div v-else>
            <img
            :src="user.picture || require('@/assets/profilePic.png')"
            alt="profile"
            height="300"
            width="300"
            class="rounded"
          >
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label for="title">Name</label>
                <input type="text" class="form-control" v-model="user.name">
                <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="title">Birthday</label>
                <input type="date" class="form-control" v-model="user.birthday">
                <span class="text-danger" v-if="this.errorList.birthday">{{ this.errorList.birthday[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">phone_number</label>
                <input type="text" class="form-control" v-model="user.phone_number">
                <span class="text-danger" v-if="this.errorList.phone_number">{{ this.errorList.phone_number[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">sexe</label>
                <input type="text" class="form-control" v-model="user.sexe">
                <span class="text-danger" v-if="this.errorList.sexe">{{ this.errorList.sexe[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">picture</label>
                <input type="text" class="form-control" v-model="user.picture">
                <span class="text-danger" v-if="this.errorList.picture">{{ this.errorList.picture[0]}}</span>
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
        // user: this.$auth.user.data,
        user: {
          name: '',
          birthday: '',
          phone_number: '',
          sexe: '',
          picture:''
        },
        Role:[],
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{}
  
      }
    },
    mounted(){
      this.getProfile(this.$auth.user.data.id);

  
    },
    methods: {
      getProfile(UserId){
        this.isLoading=true;

        axios.get(`http://localhost:8000/api/users/${UserId}/edit`).then(res=>{
            this.isLoading =false,
            this.user=res.data.message;
            console.log("data:");
            console.log(res)
        });
      },
  
      updateProfile() {
  
        this.isLoading =true,
        this.isLoadingTitle="Updating";
  
        var myThis=this;
  
        axios.put(`http://localhost:8000/api/users/${this.$auth.user.data.id}/updateProfile`, this.user, {withCredentials:true})
          .then(res => {
            console.log(res,'res');
            alert(res.data.message);
  
            this.user.name = '';
            this.user.birthday = '';
            this.user.phone_number = '';
            this.user.sexe = '';
            this.user.picture = '';

  
            this.isLoading=false;
            this.isLoadingTitle="Loading";
  
          }).catch(function(error){
            console.log(error,'error')
            if(error.response){
              if(error.response.status==422){
                myThis.errorList= error.response.data.message;
              }
            }
            myThis.isLoading=false;
          });
      },

    // updateProfile() {
    //     const updatedUser = { ...this.user }; // Create a copy of user data to avoid mutating it directly
    //     this.$store.dispatch('updateUserProfile', updatedUser)
    //         .then(() => {
    //         // Handle success (e.g., show a success message)
    //         alert('Profile updated successfully');
    //         })
    //         .catch((error) => {
    //         // Handle error (e.g., display validation errors)
    //         console.error('Profile update error:', error);
    //         });
    //     }


    }
  
   
  };
  </script>
    
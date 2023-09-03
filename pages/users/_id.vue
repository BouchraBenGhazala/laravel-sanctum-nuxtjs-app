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
                <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="description">Email</label>
                <input type="text" class="form-control" v-model="User.email">
                <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0]}}</span>
              </div>
              <div class="mb-3">
                <label for="slug">Password</label>
                <input type="text" class="form-control" v-model="User.password">
                <span class="text-danger" v-if="this.errorList.password">{{ this.errorList.password[0]}}</span>
              </div>
              <b-field label="Role" class="mb-5">
                            <b-select placeholder="Select a role" v-model="User.role_id" expanded>
                                <option v-for="role in Role" :key="role.id" :value="role.id">{{ role.name }}</option>
                            </b-select>
                        </b-field>
                <!-- <div class="mb-3">
                <label for="slug">Role</label>
                <input type="text" class="form-control" v-model="User.id_role">
                <span class="text-danger" v-if="this.errorList.id_role">{{ this.errorList.id_role[0]}}</span>
              </div> -->
              <div class="mb-3">
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
                <!-- <span class="text-danger">{{ this.errorList.password[]}}</span> -->
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
          role_id:''
        },
        Role:[],
        isLoading: false,
        isLoadingTitle: 'Loading',
        errorList:{}
  
      }
    },
    mounted(){
      this.UserId= this.$route.params.id;
      // alert(this.ProjectId)
      this.getUser(this.UserId);
      this.fetchRoles(); // Fetch roles when the component is mounted

  
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
            this.User.role_id = '';

  
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

      async fetchRoles() {
            try {
                const response = await axios.get("http://localhost:8000/api/roles"); // Adjust the API endpoint URL
                this.Role = response.data.message; // Assuming roles data is returned as an array in the 'message' field

            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },

    }
  
   
  };
  </script>
    
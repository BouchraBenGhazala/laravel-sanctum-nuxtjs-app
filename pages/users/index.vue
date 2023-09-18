<template>
    <div v-if="AdminUser">
        <div class="card mt-5 mr-5" >
            <div class="card-header d-flex justify-content-between">
        <h4 class="fs-5 fw-normal">Users List</h4>
        <!-- <NuxtLink to="/taches/create" class="btn btn-danger">Add Task</NuxtLink> -->
      </div>

        <div class="card-body">
            <div v-if="isLoading">
                <Loading :title="isLoadingTitle" />
                </div>
        <div v-else>
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(user,index) in Users" :key="index"> 
                    <td>{{ user.id}}</td>
                    <td>{{ user.name}}</td>
                    <td>{{ user.email}}</td>
                    <td>{{ user.role.name}}</td>

                    <td>
                        <NuxtLink :to="`/users/${user.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                        <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteUser($event,user.id)">Delete</button>
                    </td> 
        
                </tr>
            </tbody>
        </table>
        </div>

      </div>
        </div>
      <div class="card-body">

        </div>
    </div>
    <div v-else class="alert alert-danger mt-3" role="alert">
  Sorry! Only admins can access the users page.
</div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                Users:{},
                isLoading: true,
                isLoadingTitle: 'Loading',
                Users:{},
                user: this.$auth.user.data,
                AdminUser: null,
            };

        },
        mounted(){
            this.getUsers();
        },
        methods:{
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

            deleteUser(event, userId){

                if(confirm('Are you sure, you want to delete this data?')){

                    event.target.innerText= 'Deleting';

                    axios.delete(`http://localhost:8000/api/users/${userId}/delete`,{withCredentials:true}).then(res=>{
                        event.target.innerText= 'Delete';
                        this.getUsers();
                        
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
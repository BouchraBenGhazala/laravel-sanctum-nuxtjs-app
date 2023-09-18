<template>
    <div v-if="AdminManagerUser">
        <!-- <div v-if="user.id==usr.id"> -->
        <div class="card mt-5 mr-5" >
            <div class="card-header d-flex justify-content-between" >
        <h4 class="fs-5 fw-normal">Project Lists</h4>
        <NuxtLink to="/projets/create" class="btn btn-danger">Add Project</NuxtLink>
      </div>

        <div class="card-body">
            
            <div v-if="isLoading">
                <Loading :title="isLoadingTitle" />
                </div>
        <div v-else >
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Url</th>
                    <th>Technologies</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Tasks</th>
                    <!-- <th>Deleted at</th> -->
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(project,index) in Projects" :key="index"> 
                    <td>{{ project.id}}</td>
                    <td>{{ project.title}}</td>
                    <td>{{ project.description}}</td>
                    <td>{{ project.slug}}</td>
                    <td>{{ project.status}}</td>
                    <td>{{ project.url}}</td>
                    <td>
                <ul>
                  <li v-for="technologie in project.technologies" :key="technologie.id">
                    {{ technologie.name }}
                  </li>
                </ul>
              </td>
                    <td>{{ project.created_at}}</td>
                    <td>{{ project.updated_at}}</td>
                    <td><NuxtLink :to="`/cardTaches/${project.id}`" class="btn btn-primary btn-sm mx-1">View tasks</NuxtLink>
                        <NuxtLink :to="`/taches/createTache/${project.id}`" class="btn btn-danger btn-sm mx-1">Add Task</NuxtLink></td>
                    <!-- <td>{{ project.deleted_at}}</td> -->
                    <td>
                        <NuxtLink :to="`/projets/${project.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                        <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteProject($event,project.id)">Delete</button>
                    </td> 
                </tr>
            </tbody>
        </table>
        </div>

      </div>
        </div>
      <div class="card-body">

        </div>
    <!-- </div> -->
    </div>
    <div v-else class="alert alert-danger mt-3" role="alert">
  Sorry! Only admins and project managers can access the project page.
</div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                Projects:{},
                Users:{},
                user: this.$auth.user.data,
                AdminManagerUser: null,
                isLoading: true,
                isLoadingTitle: 'Loading',
            };

        },
        mounted(){
            this.getProjects();
            this.getUsers();
        },
        methods:{
            getProjects(){
                axios.get("http://localhost:8000/api/projets").then(res=>{
                    this.isLoading =false,

                    this.Projects=res.data.message;
                    console.log("data:");
                    console.log(res)
                    console.log("else...")
                    console.log(Projects.title)
                });
            },

            deleteProject(event, projectId){

                if(confirm('Are you sure, you want to delete this data?')){

                    event.target.innerText= 'Deleting';

                    axios.delete(`http://localhost:8000/api/projets/${projectId}/delete`,{withCredentials:true}).then(res=>{
                        event.target.innerText= 'Delete';
                        this.getProjects();
                        
                    });
                }
            },
            getUsers(){
                axios.get("http://localhost:8000/api/users").then(res=>{

                    this.isLoading =false,
                    this.Users=res.data.message;
                    console.log("data:");
                    console.log(res);

                    this.AdminManagerUser = this.Users.find(user => {
                    return user.id === this.user.id && user.role.name === 'admin'||'chef de projet';
                });
            });
            },

        }
    }
</script>

<style lang="scss" scoped>

</style>
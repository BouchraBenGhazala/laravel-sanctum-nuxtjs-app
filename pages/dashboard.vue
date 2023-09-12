<template>
    <section class="section">
    <div class="container">
      <h1 class="title mb-3">Dashboard</h1>
      <!-- <div class="alert alert-warning" role="alert">Your tasks</div> -->
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-2" >

    <div class="col">
  <div class="card h-100 bg-warning mb-3 mt-3">
    <div class="row g-0">
      <h4 class="d-inline fs-4  fw-normal text-danger col-sm-6 col-md-11 mt-3">Number of Tasks</h4>
    <b-icon class="d-inline col-6 col-md-1" icon="file-tree" size="is-medium" type="is-danger"></b-icon>
    </div>

    <div v-if="isLoading1">
      <Loading3 :title="isLoadingTitle1" />
      </div>
    <div v-else class="card-body d-flex justify-content-center align-items-center">
        <h1 class="display-4 fw-bold text-danger">{{NumberOfTasks}}</h1>
        </div>
      </div>
    </div>
  
    <!-- 2nd -->
    <div class="col">
  <div class="card h-100 bg-primary mb-3 mt-3">
    <div class="row g-0">
      <h4 class="d-inline fs-4  fw-normal text-light col-sm-6 col-md-11 mt-3">Number of Projects</h4>
    <b-icon class="d-inline col-6 col-md-1 " icon="text-box-multiple" size="is-medium" type="is-light"></b-icon>
    </div>

    <div v-if="isLoading2">
      <Loading4 :title="isLoadingTitle2" />
      </div>
    <div v-else class="card-body d-flex justify-content-center align-items-center">
        <h1 class="display-4 fw-bold text-white" >{{NumberOfProjects}}</h1>
        </div>
      </div>
    </div>
    <!-- 3rd -->
    <div class="col">
  <div class="card h-100 bg-secondary mb-3 mt-3">
    <div class="row g-0">
      <h4 class="d-inline fs-4  fw-normal text-white col-sm-6 col-md-11 mt-3">Number of Technologies</h4>
    <b-icon class="d-inline col-6 col-md-1" icon="web" size="is-medium" type="is-white"></b-icon>
    </div>
    <div v-if="isLoading3">
      <Loading4 :title="isLoadingTitle3" />
      </div>
    <div v-else class="card-body d-flex justify-content-center align-items-center">
        <h1 class="display-4 fw-bold text-white">{{NumberOfTechnologies}}</h1>
        </div>
      </div>
    </div>
    <!-- 4rd -->
    <div class="col">
  <div class="card h-100 bg-info mb-3 mt-3">
    <div class="row g-0">
      <h4 class="d-inline fs-4  fw-normal text-black col-sm-6 col-md-11 mt-3">Number of Users</h4>
    <b-icon class="d-inline col-6 col-md-1" icon="account-group" size="is-medium"></b-icon>
    </div>
    <div v-if="isLoading4">
      <Loading5 :title="isLoadingTitle4" />
      </div>
    <div v-else class="card-body d-flex justify-content-center align-items-center">
        <h1 class="display-4 fw-bold">{{NumberOfUsers}}</h1>
        </div>
      </div>
    </div>

  </div>
  </section>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: this.$auth.user.data,
      Tasks:{},
      Projects:{},
      Technologies:{},
      Users:{},
      isLoading1: true,
      isLoadingTitle1: 'Loading',
      isLoading2: true,
      isLoadingTitle2: 'Loading',   
      isLoading3: true,
      isLoadingTitle3: 'Loading',   
      isLoading4: true,
      isLoadingTitle4: 'Loading',
    }
  },
  mounted(){
            this.getTasks();
            this.getProjects();
            this.getTechnologies();
            this.getUsers();
        },
        methods:{
            getTasks(){
                axios.get("http://localhost:8000/api/tasks").then(res=>{
                  this.isLoading1 =false,
                    this.Tasks=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },
            getProjects(){
                axios.get("http://localhost:8000/api/projets").then(res=>{

                    this.isLoading2 =false,
                    this.Technologies=res.data.message;
                    this.Projects=res.data.message;
                    console.log("data:");
                    console.log(res)
                    console.log("else...")
                    console.log(Projects.title)
                });
            },
            getTechnologies(){
                axios.get("http://localhost:8000/api/technologies").then(res=>{

                    this.isLoading3 =false,
                    this.Technologies=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },
            getUsers(){
                axios.get("http://localhost:8000/api/users").then(res=>{

                  this.isLoading4 =false,
                    this.Users=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },

        },
        computed: {
          NumberOfTasks(){
            return this.Tasks.length
          },
          NumberOfProjects(){
            return this.Projects.length
          },
          NumberOfTechnologies(){
            return this.Technologies.length
          },
          NumberOfUsers(){
            return this.Users.length
          },

        },
}
</script>

<style>

</style>

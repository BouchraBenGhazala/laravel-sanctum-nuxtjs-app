<template>
    <section class="section">
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <!-- <div class="alert alert-warning" role="alert">Your tasks</div> -->
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4" >
      <div class="col">
  <div class="card h-100 bg-dark mb-3 mt-3">
    <div class="card-header d-flex justify-content-center align-items-center">
      <h4 class="fs-5 fw-normal fw-bold text-white">Number of tasks</h4>
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
      <div class="bg-danger text-white rounded-circle p-4">
        <h1 class="display-4">{{NumberOfTasks}}</h1>
      </div>
    </div>
  </div>
</div>

  
    <!-- 2nd -->
    <div class="col">
  <div class="card h-100 bg-dark mb-3 mt-3">
    <div class="card-header d-flex justify-content-center align-items-center">
      <h4 class="fs-5 fw-normal fw-bold text-white">Number of projects</h4>
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
      <div class="bg-danger text-white rounded-circle p-4">
        <h1 class="display-4">{{NumberOfProjects}}</h1>
      </div>
        </div>
      </div>
    </div>
    <!-- 3rd -->
    <div class="col">
  <div class="card h-100 bg-dark mb-3 mt-3">
    <div class="card-header d-flex justify-content-center align-items-center">
      <h4 class="fs-5 fw-normal fw-bold text-white">Number of Technologies</h4>
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
      <div class="bg-danger text-white rounded-circle p-4">
        <h1 class="display-4">{{NumberOfTechnologies}}</h1>
      </div>
        </div>
      </div>
    </div>
    <!-- 4rd -->
    <div class="col">
  <div class="card h-100 bg-dark mb-3 mt-3">
    <div class="card-header d-flex justify-content-center align-items-center">
      <h4 class="fs-5 fw-normal fw-bold text-white">Number of users</h4>
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
      <div class="bg-danger text-white rounded-circle p-4">
        <h1 class="display-4">{{NumberOfUsers}}</h1>
      </div>
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
                    this.Tasks=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },
            getProjects(){
                axios.get("http://localhost:8000/api/projets").then(res=>{

                    this.Projects=res.data.message;
                    console.log("data:");
                    console.log(res)
                    console.log("else...")
                    console.log(Projects.title)
                });
            },
            getTechnologies(){
                axios.get("http://localhost:8000/api/technologies").then(res=>{

                    this.isLoading =false,
                    this.Technologies=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },
            getUsers(){
                axios.get("http://localhost:8000/api/users").then(res=>{

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

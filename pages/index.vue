<!-- https://github.com/BouchraBenGhazala/rc2k_fullstack.git -->
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hi {{ user.name }}</h1>
      <div class="alert alert-warning" role="alert">Your tasks</div></div>
    <div class="row row-cols-1 row-cols-md-3 g-4" >
    <div class="col" v-for="(task,index) in Tasks"  :key="index">
        <div class="card h-100 bg-warning    mb-3 mt-3" v-if="user.id == task.user.id">
            <div class="card-header d-flex justify-content-between">
            <h4 class="fs-5 fw-normal fw-bold">{{ task.title}}</h4>


        </div>
        <div class="card-body">
            <p class="card-text">{{ task.description}}</p>
            <p>{{ task.priority}}</p>
            <div class="d-inline-block bg-danger text-white px-1 rounded">
            <small>{{ task.type}}</small>
        </div>
        <p class="card-text">{{ task.project.title}}</p>

        </div>
        <div class="card-footer">
            <small class="text-muted "><span class="fw-bold">Creation:</span> {{ formatTimeAgo(task.created_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Last update:</span> {{ formatTimeAgo(task.updated_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Due date:</span> {{ formatTimeLeft(task.due_date) }}</small>
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
    }
  },
  mounted(){
            this.getTasks();
        },
        methods:{
            getTasks(){
                axios.get("http://localhost:8000/api/tasks").then(res=>{

  
                    this.Tasks=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },


            formatTimeAgo(timestamp) {
                const currentTime = new Date();
                const updatedTime = new Date(timestamp);
                const timeDifference = Math.floor((currentTime - updatedTime) / 60000); // Difference in minutes

                if (timeDifference < 1) {
                    return 'Just now';
                } else if (timeDifference === 1) {
                    return '1 minute ago';
                } else if (timeDifference < 60) {
                    return `${timeDifference} minutes ago`;
                } 
                else {
        const hours = Math.floor(timeDifference / 60);
        if (hours === 1) {
          return '1 hour ago';
        } else if (hours < 24) {
          return `${hours} hours ago`;
        } else {
          const days = Math.floor(hours / 24);
          if (days === 1) {
            return '1 day ago';
          } else {
            return `${days} days ago`;
          }

            }
        }
    },
    
    formatTimeLeft(timestamp) {
                const currentTime = new Date();
                const dueTime = new Date(timestamp);
                const timeDifference = Math.floor((dueTime - currentTime) / 60000); // Difference in minutes

                const hours = Math.floor(timeDifference / 60);
                const days = Math.floor(hours / 24);
                if(days<1){
                    return 'Overdue'
                }
                else if (days === 1) {
                    return '1 day left';
                } else {
                    return `${days} days left`;
                }

            
    
    },
        },
        computed: {
            routeParams() {
            return this.$route.params;
            },
        },
}
</script>

<style>

</style>
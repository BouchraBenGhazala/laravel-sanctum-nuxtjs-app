<template>
    <!-- <div>
        <div class="card mt-5 mr-5" >
            <div class="card-header d-flex justify-content-between">
        <h4 class="fs-5 fw-normal">Task Lists</h4>
        <NuxtLink to="/taches/create" class="btn btn-danger">Add Task</NuxtLink>
      </div>

        <div class="card-body">
                <table class="table table-striped table-bordered">
 
            <tbody>
                <tr v-for="(task,index) in Tasks" :key="index" > 
                    <div v-if="routeParams.id == task.project.id">
                        <td>{{ task.id}}</td>
                        <td>{{ task.title}}</td>
                        <td>{{ task.description}}</td>
                        <td>{{ task.priority}}</td>
                        <td>{{ task.type}}</td>
                        <td>{{ task.user.name}}</td>
                        <td>{{ task.project.title}}</td>
                        <td>{{ task.due_date}}</td>
                        <td>{{ task.created_at}}</td>
                        <td>{{ task.updated_at}}</td>
                        <td>{{ task.deleted_at}}</td>
                        <td>
                            <NuxtLink :to="`/taches/${task.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                            <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteTask($event,task.id)">Delete</button>
                        </td> 
                    </div>
         
                </tr>
            </tbody>
        </table>
            


      </div>
        </div>
      <div class="card-body">
  
        </div>
    </div> -->

    <div class="row row-cols-1 row-cols-md-3 g-4" >
    <div class="col" v-for="(task,index) in Tasks" :key="index">
        <div class="card h-100 bg-light mt-3" v-if="routeParams.id == task.project.id">
            <div class="card-header d-flex justify-content-between">
            <h4 class="fs-5 fw-normal fw-bold">{{ task.title}}</h4>
            <div>
            <NuxtLink :to="`/taches/${task.id}`" class="btn btn-success btn-sm">Edit</NuxtLink>
            <button type="button" class="btn btn-danger btn-sm" @click="deleteTask($event,task.id)">Delete</button>
            </div>

        </div>
        <div class="card-body">
            <p class="card-text">{{ task.description}}</p>
            <p>{{ task.priority}}</p>
            <div class="d-inline-block bg-danger text-white px-1 rounded">
            <small>{{ task.type}}</small>
        </div>
            <p>by : {{ task.user.name}}</p>

        </div>
        <div class="card-footer">
            <small class="text-muted "><span class="fw-bold">Creation:</span> {{ formatTimeAgo(task.created_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Last update:</span> {{ formatTimeAgo(task.updated_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Due date:</span> {{ formatTimeLeft(task.due_date) }}</small>
        </div>
        </div>
        <div v-else>
            <div class="card h-100 mt-3  faded-content">
                <div class="card-header d-flex justify-content-between">
            <h4 class="fs-5 fw-normal fw-bold">{{ task.title}}</h4>
            <div>
            <NuxtLink :to="`taches/${task.id}}`" class="btn btn-success btn-sm">Edit</NuxtLink>
            <button type="button" class="btn btn-danger btn-sm" @click="">Delete</button>
            </div>

        </div>
            <div class="card-body">
            <p class="card-text">{{ task.description}}</p>
            <p>{{ task.priority}}</p>
            <div class="d-inline-block bg-danger text-white px-1 rounded">
            <small>{{ task.type}}</small>
        </div>

            <p>by : {{ task.user.name}}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted "><span class="fw-bold">Creation:</span> {{ formatTimeAgo(task.created_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Last update:</span> {{ formatTimeAgo(task.updated_at) }}</small>
            <small class="text-muted"><span class="fw-bold">Due date:</span> {{ formatTimeLeft(task.due_date) }}</small>
        </div>
    </div>
        </div>
    </div>
  

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                Tasks:{},

            };

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

            deleteTask(event, taskId){

                if(confirm('Are you sure, you want to delete this data?')){

                    event.target.innerText= 'Deleting';

                    axios.delete(`http://localhost:8000/api/tasks/${taskId}/delete`,{withCredentials:true}).then(res=>{
                        event.target.innerText= 'Delete';
                        this.getTasks();
                        
                    });
                }
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
        }
        ,
        computed: {
            routeParams() {
            return this.$route.params;
            },
        },
    }
</script>

<style scoped>
.faded-content {
  opacity: 0.1;
}
</style>
<template>
    <div>
        <div class="card mt-5 mr-5" >
            <div class="card-header d-flex justify-content-between">
        <h4 class="fs-5 fw-normal">Task Lists</h4>
        <NuxtLink to="/taches/create" class="btn btn-danger">Add Task</NuxtLink>
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Type</th>
                    <th>User name</th>
                    <th>Project title</th>
                    <th>Due Date</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <!-- <th>Deleted at</th> -->
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in Tasks" :key="index"> 
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
                    <!-- <td>{{ task.deleted_at}}</td> -->
                    <td>
                        <NuxtLink :to="`/taches/${task.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                        <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteTask($event,task.id)">Delete</button>
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
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                Tasks:{},
                isLoading: true,
                isLoadingTitle: 'Loading',
            };

        },
        mounted(){
            this.getTasks();
        },
        methods:{
            getTasks(){
                axios.get("http://localhost:8000/api/tasks").then(res=>{

                    this.isLoading =false,
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
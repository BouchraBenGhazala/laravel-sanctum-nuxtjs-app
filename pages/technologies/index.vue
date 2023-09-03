
<template>
    <div>
        <div class="card mt-5 mr-5" >
            <div class="card-header d-flex justify-content-between">
        <h4 class="fs-5 fw-normal">Technologies</h4>
        <NuxtLink to="/technologies/create" class="btn btn-danger">Add Technologie</NuxtLink>
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
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(technologie,index) in Technologies" :key="index"> 
                    <td>{{ technologie.id}}</td>
                    <td>{{ technologie.name}}</td>
                    <td>{{ technologie.created_at}}</td>
                    <td>{{ technologie.updated_at}}</td>
                    <!-- <td>{{ task.deleted_at}}</td> -->
                    <td>
                        <NuxtLink :to="`/technologies/${technologie.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                        <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteTechnologie($event,technologie.id)">Delete</button>
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
                Technologies:{},
                isLoading: true,
                isLoadingTitle: 'Loading',
            };

        },
        mounted(){
            this.getTechnologies();
        },
        methods:{
            getTechnologies(){
                axios.get("http://localhost:8000/api/technologies").then(res=>{

                    this.isLoading =false,
                    this.Technologies=res.data.message;
                    console.log("data:");
                    console.log(res)
                });
            },

            deleteTechnologie(event, technologieId){

                if(confirm('Are you sure, you want to delete this data?')){

                    event.target.innerText= 'Deleting';

                    axios.delete(`http://localhost:8000/api/technologies/${technologieId}/delete`,{withCredentials:true}).then(res=>{
                        event.target.innerText= 'Delete';
                        this.getTechnologies();
                        
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
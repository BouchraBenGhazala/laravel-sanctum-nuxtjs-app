<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <h2 class="title has-text-centered">Register</h2>
                    <div v-if="isLoading">
                        <Loading :title="isLoadingTitle" />
                    </div>
                    <div v-else>
                        <form @submit.prevent="saveUser">
                            <b-field label="Name">
                                <b-input placeholder="Name" type="text" v-model="User.name" icon="account" required>
                                </b-input>
                            </b-field>
                            <!-- <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0] }}</span> -->


                            <b-field label="Email">
                                <b-input placeholder="Email" type="email" v-model="User.email" icon="email-outline"
                                    required>
                                </b-input>
                            </b-field>
                            <!-- <span class="text-danger" v-if="this.errorList.email">{{
                                    this.errorList.password[0] }}</span> -->

                            <b-field label="Password">
                                <b-input type="password" v-model="User.password" password-reveal icon="lock-outline"
                                    required>
                                </b-input>
                            </b-field>
                            <!-- <span class="text-danger" v-if="this.errorList.password">{{ this.errorList.password[0] }}</span> -->
                            <b-field label="Role" class="mb-5">
                            <b-select placeholder="Select a role" v-model="User.role_id" expanded>
                                <option v-for="role in Role" :key="role.id" :value="role.id">{{ role.name }}</option>
                            </b-select>
                        </b-field>
                        

                            <b-button type="is-dark is-fullwidth" native-type="submit">
                                Register
                            </b-button>
                            <p style="color: red;">{{ this.errorList[0] }}</p>
                            <p style="color: red;">{{ this.errorList[1] }}</p>
                            <p style="color: red;">{{ this.errorList[2] }}</p>
                           

                        </form>
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
            User: {
                name: '',
                email: '',
                password: '',
                role_id:''

            },
            Role:[],
            isLoading: false,
            isLoadingTitle: 'Loading',
            errorList: {}

        }
    },
    mounted(){
        this.fetchRoles(); // Fetch roles when the component is mounted
    },
    methods: {
        async saveUser() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";

            var myThis = this;

                await axios.post("http://localhost:8000/api/register", this.User, {withCredentials:true})
                .then(res => {
                    console.log(res, 'res');
                    alert(res.data.message);

                    this.User.name = '';
                    this.User.email = '';
                    this.User.password = '';
                    this.User.role_id = '';


                    this.isLoading = false;
                    this.isLoadingTitle = "Loading";

                }).catch(function (error) {
                    console.log('the error is: ',error)
                    if (error.response) {
                        if (error.response.status == 401) {
                            myThis.errorList = error.response.data.message;
                        }
                    }
                    myThis.isLoading = false;
                });
            
        },
        async fetchRoles() {
            try {
                const response = await axios.get("http://localhost:8000/api/roles"); // Adjust the API endpoint URL
                this.Role = response.data.message; // Assuming roles data is returned as an array in the 'message' field

            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }

        
    }
    


};
</script>

<style scoped>
.mt-5 {
    padding: 20px;
}
</style>

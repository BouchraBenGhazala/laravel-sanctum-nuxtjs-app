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
                                <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.title[0] }}</span>
                            </b-field>

                            <b-field label="Email">
                                <b-input placeholder="Email" type="email" v-model="User.email" icon="email-outline"
                                    required>
                                </b-input>
                                <span class="text-danger" v-if="this.errorList.email">{{
                                    this.errorList.description[0] }}</span>
                            </b-field>

                            <b-field label="Password">
                                <b-input type="password" v-model="User.password" password-reveal icon="lock-outline"
                                    required>
                                </b-input>
                                <span class="text-danger" v-if="this.errorList.password">{{ this.errorList.slug[0] }}</span>
                            </b-field>

                            <b-button type="is-dark is-fullwidth" native-type="submit">
                                Register
                            </b-button>
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

            },
            isLoading: false,
            isLoadingTitle: 'Loading',
            errorList: {}

        }
    },
    methods: {
        async saveUser() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";

            var myThis = this;

            await axios.get('/sanctum/csrf-cookie').then(data => {
                axios.post("http://localhost:8000/api/register", this.User)
                .then(res => {
                    console.log(res, 'res');
                    alert(res.data.message);

                    this.User.name = '';
                    this.User.email = '';
                    this.User.password = '';


                    this.isLoading = false;
                    this.isLoadingTitle = "Loading";

                }).catch(function (error) {
                    console.log(error, 'error')
                    if (error.response) {
                        if (error.response.status == 422) {
                            myThis.errorList = error.response.data.errors;
                        }
                    }
                    myThis.isLoading = false;
                });
            });
        }
    }


};
</script>

<style scoped>
.mt-5 {
    padding: 20px;
}
</style>

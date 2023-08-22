<template>
          <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <h2 class="title has-text-centered">Login</h2>
  
            <form method="post" @submit.prevent="login">
              <b-field label="Email">
                <b-input
                type="email"
                v-model="email"
                required>
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                type="password"
                v-model="password"
                password-reveal
                required>
              </b-input>
            </b-field>
            
            <b-button type="is-dark is-fullwidth" native-type="submit">
              Login
            </b-button>
          </form>
          <p style="color: red;">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '' // Add this line to store the error message
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password
          }
        });
        
        // Successful login, redirect or handle as needed
        this.$router.push('/');
      } catch (error) {
        // Failed login, display error message
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred while logging in.';
        }
      }
    }
  }
};
</script>

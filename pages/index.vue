<!-- https://github.com/BouchraBenGhazala/rc2k_fullstack.git -->
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Dashboard</h1>

      <p class="subtitle">Hi {{ user.name }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user.data,
    }
  },
  methods: {
  },
}
</script>
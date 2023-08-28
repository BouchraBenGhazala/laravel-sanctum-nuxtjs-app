
<template>
  <div>
    <b-navbar class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation">
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
            src="~assets/logorc2k.png"
            alt="Buefy"
            height="40"
          >
          </b-navbar-item>
      </template>

      <template #end>
          <b-navbar-item tag="div">
              <div class="buttons">
                  <a class="button is-light has-text-weight-bold" @click.prevent="logout">
                      Logout
                  </a>
              </div>
          </b-navbar-item>
      </template>
  </b-navbar>
  
  <section class="main-content columns">
      <aside class="column is-3 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <NuxtLink
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="container column is-9">
        <Nuxt />
      </div>
    </section>
  </div>
 
</template>
<script>

export default {
  name: 'DefaultLayout',
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Tableau de bord',
          icon: 'view-dashboard',
          to: { name: 'dashboard' }
        },
        {
          title: 'Projets',
          icon: 'text-box-multiple',
          to: { name: 'projets' }
        },
        {
          title: 'Taches',
          icon: 'file-tree',
          to: { name: 'taches' }
        },
        {
          title: 'Suivi de progresse',
          icon: 'trending-up',
          to: { name: 'progress' }
        },
        {
          title: "Vue d'ensemble",
          icon: 'account-multiple',
          to: { name: 'vue-ensemble' }
        },
        {
          title: 'Utilisateurs',
          icon: 'account-group',
          to: { name: 'users' }
        },
        {
          title: 'Fichiers',
          icon: 'file-multiple',
          to: { name: 'files' }
        },
        {
          title: 'Notifications',
          icon: 'bell',
          to: { name: 'notifs' }
        },
        {
          title: 'Paramètres',
          icon: 'cog',
          to: { name: 'settings' }
        },
        
      ]
    }
  },
  methods:{
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  }
}
</script>


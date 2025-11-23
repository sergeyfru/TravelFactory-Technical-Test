
<script setup>
  import { RouterView, RouterLink, useRouter } from "vue-router";
  const u_id = localStorage.getItem("u_id");
  import  {useAuthStore} from "./stores/authStore.js";
  const authStore = useAuthStore();
  const router = useRouter();
 
  const logout = () => {
    authStore.logout();
    router.push("/login");
  };
  </script>

  <template>
    <header class="header">
      <RouterLink class="nav-link" active-class="active" :to="`/user/${u_id || 1}`" >My vacations</RouterLink>
      <RouterLink class="nav-link" active-class="active" to="/vacationsrequests" >Vacations Requests</RouterLink>
      <RouterLink class="nav-link" active-class="active" to="/login" @click="logout">Change User</RouterLink>
    </header>
    <main>
      <RouterView class="wrapper"/>
    </main>
  </template>

    
<style scoped>
.header {
  width: 100%;
  background: linear-gradient(to right, #1976d2, #42a5f5);
  padding: 1rem;
  display: flex;
  gap : 2rem;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.nav-link {
  color: white;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.nav-link:hover {
  color: #cce7ff;
}

.active {
  font-weight: bold;
  color: #ffeb3b !important;
}

.app-main {
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background: #f5f7fa;
}
.wrapper {
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%);
}
</style>


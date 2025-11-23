
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);

const checkInputs = () => {
  if (!username.value || !password.value) {
    alert("Please fill in all fields");
    return false;
  }
  return true;
};

const loggin = async () => {
  if (!checkInputs()) return;
  loading.value = true;


  try {
    const response = await axios.post(
      "http://localhost:3001/registration/loggingin",
      {
        username: username.value,
        password: password.value,
      }
    );
    loading.value = false;
    if(!response.data){
      throw new Error("Invalid response from server");
    }
        localStorage.setItem("u_id", response.data.u_id);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem('isValidator', response.data.role === "validator");
    
    if (response.data.role === "validator") {
      localStorage.setItem("isValidator", true);
      router.push("/vacationsrequests");
    } else {
      localStorage.setItem("isValidator", false);
      router.push(`/user/${response.data.u_id}`);
    }

  } catch (error) {
    console.error("Login error:", error);
    loading.value = false;  
    alert(
      `Login failed.\n ${
        error.response?.data?.message ||
        "Please check your credentials and try again."
      }`
    );
  }
};
</script>

<template>
  <main class="login-wrapper">
    <div class="login-card">
      <h2 class="title">Vacation Manager</h2>
      <p class="subtitle">Please sign in</p>

      <input
        type="text"
        placeholder="Username"
        v-model="username"
        class="input"
      />

      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="input"
      />

      <button class="btn" @click="loggin" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}   
      </button>
    </div>
  </main>
</template>

<style scoped>

.login-card {
  width: 100%;
  max-width: 350px;
  
  margin-top: 60px;

  background: white;
  padding: 2rem;
  border-radius: 14px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  gap: 14px;

  animation: fadeIn 0.4s ease;
}

.title {
  margin: 0;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #0d47a1;
}

.subtitle {
  margin: 0 0 1rem 0;
  text-align: center;
  color: #555;
  font-size: 0.95rem;
}

.input {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #b0bec5;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  border-color: #1976d2;
  box-shadow: 0 0 4px rgba(25, 118, 210, 0.4);
}

.btn {
  padding: 0.8rem;
  margin-top: 10px;
  background: #1976d2;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #0d47a1;
}

/* Анимация */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 📱 Адаптивность */
@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
  }
  .title {
    font-size: 1.4rem;
  }
  .input, .btn {
    font-size: 0.95rem;
  }
}
</style>
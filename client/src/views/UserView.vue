<script setup>
import axios from "axios";
import { ref } from "vue";
const start_date = ref("");
const end_date = ref("");
const reason = ref("");
const myVacations = ref([]);

const normalizeDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleDateString();
    };

    const getMyVacations = async () => {
      const u_id = localStorage.getItem("u_id");

      try {
        const response = await axios.get(
          `http://localhost:3001/api/vacations/${u_id}`
        );
        for (let vacation of response.data) {
          vacation.start_date = normalizeDate(vacation.start_date);
          vacation.end_date = normalizeDate(vacation.end_date);
          vacation.status = vacation.status.toUpperCase();
        }
        myVacations.value = response.data;
      } catch (error) {
        console.error("There was an error fetching the vacations!", error);
      }
    };

    const chackDates = () => {
      if (!start_date.value || !end_date.value) {
        alert("Please select both start and end dates.");
        return 0;
      } else {
        const start = new Date(start_date.value);
        const end = new Date(end_date.value);

        if (start > end) {
          alert("End date must be after start date.");
        }
        return !(start > end);
      }
    };

    const addVacationRequest = async () => {
      if (!chackDates()) return;

      const u_id = localStorage.getItem("u_id");

      if (!u_id) {
        alert("User not logged in.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3001/api/addvacationrequest",
          {
            u_id,
            start_date: start_date.value,
            end_date: end_date.value,
            reason: reason.value,
          }
        );
        getMyVacations(); // Refresh the list after adding
      } catch (error) {
        console.error("There was an error adding the vacation request!", error);
      }
    };
    getMyVacations();
</script>

<template>
  <main class="user-wrapper">
    <h2 class="title">My Vacations</h2>
    <p class="subtitle">Create vacation request and view your history</p>

    <div class="container">
      <div class="vacation-form">
        <h3 class="form-title">Add new request</h3>

        <div class="form-row">
          <label>Start Date</label>
          <input type="date" v-model="start_date" />
        </div>

        <div class="form-row">
          <label>End Date</label>
          <input type="date" v-model="end_date" />
        </div>

        <div class="form-row">
          <label>Reason</label>
          <input type="text" v-model="reason" placeholder="Reason message" />
        </div>

        <button class="btn-add" @click="addVacationRequest">Add Request</button>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead style="text-align: center">
            <tr>
              <th>№</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Comment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody v-if="myVacations.length > 0">
            <tr
              v-for="(vacation, index) in myVacations"
              :key="vacation.v_id"
              :class="vacation.status.toLowerCase()"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ vacation.start_date }}</td>
              <td>{{ vacation.end_date }}</td>
              <td>{{ vacation.reason }}</td>
              <td>{{ vacation.comments }}</td>
              <!-- <td>{{ vacation.status }}</td> -->
              <td>
                <span class="status" :class="vacation.status.toLowerCase()">
                  {{ vacation.status }}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="loading">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.user-wrapper {
  min-height: calc(100vh - 80px);
}

.title {
  text-align: center;
  font-size: 1.8rem;
  color: #0d47a1;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.vacation-form {
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  font-size: 1.2rem;
  color: #1976d2;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-row label {
  font-weight: 600;
  color: #333;
}

.vacation-form input {
  padding: 0.7rem 0.9rem;
  border: 1px solid #b0bec5;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
  font-size: 1rem;
}

.vacation-form input:focus {
  border-color: #1976d2;
  box-shadow: 0 0 4px rgba(25, 118, 210, 0.4);
}

.btn-add {
  padding: 0.8rem;
  background: #1976d2;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-add:hover {
  background: #0d47a1;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.table th {
  background: #1976d2;
  color: white;
  padding: 0.8rem;
  text-align: left;
}

.table td {
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid #e0e0e0;
}

.status {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
  text-transform: uppercase;
}

.approved {
  background: rgba(46, 125, 50, 0.35);
}

.rejected {
  background: rgba(198, 40, 40, 0.35);
}

.pending {
  background: rgba(249, 168, 37, 0.18);
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}
</style>

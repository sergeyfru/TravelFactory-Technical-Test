<script setup>
import axios from "axios";
import { ref } from "vue";
const isValidator = localStorage.getItem('isValidator');

const vacations = ref([]);
const normalizeDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};
const getAllVacations = async () => {
  if (!isValidator) {
    alert("Access denied. You do not have permission to view this page.");
    return;
  };
  try {
    const response = await axios.get("http://localhost:3001/api/allvacations");
    for (let vacation of response.data) {
      vacation.start_date = normalizeDate(vacation.start_date);
      vacation.end_date = normalizeDate(vacation.end_date);
      vacation.status = vacation.status.toUpperCase();
    }
    vacations.value = response.data;
  } catch (error) {
    console.error("There was an error fetching the vacations!", error);
  }
};

const updateVacationStatus = async (v_id, status) => {
  let comments = null;
  if (status === "rejected") {
    comments = prompt("Please provide a reason for rejection:");
  }

  try {
    const response = await axios.put(
      `http://localhost:3001/api/updatevacationrequeststatus`,
      { v_id, status, comments }
    );
    getAllVacations(); // Refresh the list after updating
  } catch (error) {
    console.error("There was an error updating the vacation status!", error);
  }
};
getAllVacations();
</script>

<template>
  <div v-if="isValidator">
    <h2 class="title">Vacation Requests</h2>
    <p class="subtitle">Approve or Reject requests below</p>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Username</th>
            <th style="text-align: center;">Start Date</th>
            <th style="text-align: center;">End Date</th>
            <th style="text-align: center;">Reason</th>
            <th style="text-align: center;">Status</th>
            <th style="text-align: center;">Action</th>
          </tr>
        </thead>
        <tbody v-if="vacations.length > 0">
          <tr
            v-for="(vacation, index) in vacations"
            :key="vacation.v_id"
            :class="vacation.status.toLowerCase()"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.username }}</td>
            <td>{{ vacation.start_date }}</td>
            <td>{{ vacation.end_date }}</td>
            <td>{{ vacation.reason }}</td>
            <td>{{ vacation.status }}</td>
            <td>
              <div class="action-buttons">
                <button
                  class="btn approve"
                  @click="updateVacationStatus(vacation.v_id, 'approved')"
                >
                  Approve
                </button>

                <button
                  class="btn reject"
                  @click="updateVacationStatus(vacation.v_id, 'rejected')"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="loading">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <h2 class="title">Access Denied</h2>
    <p class="subtitle">You do not have permission to view this page.</p>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: #0d47a1;
}

.subtitle {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
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
  font-size: 0.95rem;
  text-align: left;
  white-space: nowrap;
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

.action-buttons {
  display: flex;
  gap: 0.4rem;
}

.btn {
  padding: 0.45rem 0.7rem;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn.approve {
  background: #2e7d32;
}

.btn.approve:hover {
  background: #1b5e20;
}

.btn.reject {
  background: #c62828;
}

.btn.reject:hover {
  background: #8e0000;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }
  .styled-table th,
  .styled-table td {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
  .btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
}

.loading {
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: #666;
}
</style>

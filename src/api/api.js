import axios from "axios";

class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3000/api",
      withCredentials: true,
    });
  }

  async getAll(tableId) {
    const res = await this.axios.get(`/tables/${tableId}/rows`);
    return res.data;
  }

  async createOne(tableId, data) {
    const res = await this.axios.post(`/tables/${tableId}/rows`, data);
    return res.data;
  }

  async updateOne(tableId, rowId, data) {
    const res = await this.axios.patch(
      `/tables/${tableId}/rows/${rowId}`,
      data
    );
    return res.data;
  }

  async deleteOne(tableId, rowId) {
    const res = await this.axios.delete(`/tables/${tableId}/rows/${rowId}`);
    return res.data;
  }

  async getTables() {
    const res = await this.axios.get("/schema");
    return res.data;
  }

  async createTable(data) {
    const res = await this.axios.post("/schema", data);
    return res.data;
  }

  async editTable(tableId, data) {
    const res = await this.axios.put(`/schema/${tableId}`, data);
    return res.data;
  }

  async dropTable(tableId) {
    const res = await this.axios.delete(`/schema/${tableId}`);
    return res.data;
  }

  async checkForAdmin() {
    const res = await this.axios.get("/auth/");
    const { user } = res.data;
    if (user?.role === "admin") return user;
    return null;
  }

  async checkIfAdminHasRegistered() {
    const res = await this.axios.get("/auth/admin/registered");
    console.log(res, "HEREEE");
    return res.data;
  }

  async register(data) {
    const res = await this.axios.post("/auth/admin/register", data);
    return res.data;
  }

  async login(data) {
    const res = await this.axios.post("/auth/admin/login", data);
    return res.data;
  }

  async logout() {
    const res = await this.axios.post("/auth/logout");
    return res.data;
  }

  async registerUser(data) {
    const res = await this.axios.post("/auth/register", data);
    return res.data;
  }

  async getLogs() {
    const res = await this.axios.get("/admin/logs");
    return res.data;
  }

  async deleteLog(id) {
    console.log(id, "ADMIN UI HERE");
    const res = await this.axios.delete(`/admin/logs/${id}`);
    return res.data;
  }

  async getBackups() {
    const res = await this.axios.get("/admin/backups");
    return res.data;
  }

  async backup(filename) {
    const res = await this.axios.post(`/admin/backups`, { filename });
    return res.data;
  }

  async downloadBackup(filename) {
    const res = await this.axios.get(`/admin/backups/${filename}`, {
      responseType: "blob",
    });
    return new Blob([res.data], { type: res.headers["content-type"] });
  }

  async deleteBackup(filename) {
    const res = await this.axios.delete(`/admin/backups/${filename}`);
    return res.data;
  }
}

export default new Api();

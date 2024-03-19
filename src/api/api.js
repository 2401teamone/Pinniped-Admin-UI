import axios from 'axios';

class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/api',
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
    const res = await this.axios.get('/schema');
    return res.data;
  }

  async createTable(data) {
    const res = await this.axios.post('/schema', data);
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
    const res = await this.axios.get('/admin/');
    console.log(res, 'in APOI');
    return res.data;
  }

  async checkIfAdminHasRegistered() {
    const res = await this.axios.get('/admin/registered');
    return res.data;
  }

  async register(data) {
    const res = await this.axios.post('/auth/admin/register', data);
    return res.data;
  }

  async login(data) {
    const res = await this.axios.post('/auth/admin/login', data);
    return res.data;
  }

  async logout() {
    const res = await this.axios.post('/auth/logout');
    return res.data;
  }
}

export default new Api();
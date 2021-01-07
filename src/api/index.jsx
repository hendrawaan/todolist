const TODO_API = '/hanabyan/todo/1.0.0/to-do-list'
const api = {
    async fetchToApi(endPoint, methode, data, header = {}) {
        return fetch(endPoint, {
            method: methode,
            body: data,
            headers: { ...header, "Content-type": "application/json" },
        })
            .then((res) => res.json())
            .catch(() => {
                throw new Error("Uppss.. Terjadi kesalahan.");
            });
    },
    /**
   * Digunakan untukn melalukan get ke endpoint.
   * @param {string} endPoint Alamat url Endpoint API.
   * @param {string} header Header yang akan dikirm
   */
    async get(endPoint, header) {
        return await this.fetchToApi(endPoint, "GET", null, header);
    }
}
export const getData = async () =>
    await api.get(TODO_API);

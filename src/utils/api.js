import axios from "axios"

export default class AxiosApi{

    constructor(url_principal){
        this.url_principal = url_principal
    }
    
    async getAllAxios(url_api){
        const data = await axios.get(`${this.url_principal}/${url_api}`)
        const resp = await data.data
        return resp
    }

    async getOneAxios(url_api, id){
        const data = await axios.get(`${this.url_principal}/${url_api}/${id}`)
        const resp = await data.data
        return resp
    }

    async postAxios(url_api, datos, headers){
        const data = await axios.post(`${this.url_principal}/${url_api}/`, JSON.stringify(datos), { headers: headers })
        const resp = await data.data
        return resp
    }

    async putAxios(url_api, id, datos, headers){
        const data = await axios.put(`${this.url_principal}/${url_api}/${id}/`, JSON.stringify(datos), { headers: headers })
        const resp = data.data
        return resp
    }

    async deleteAxios(url_api, id){
        const data = await axios.delete(`${this.url_principal}/${url_api}/${id}`)
        const resp = await data.status
        return resp
    }

}

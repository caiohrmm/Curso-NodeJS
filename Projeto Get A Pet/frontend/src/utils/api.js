// Helper para facilitar na conexao com a API.
import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:4000"
})
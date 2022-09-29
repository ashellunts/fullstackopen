import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

function getAll() {
    return axios.get(baseURL).then(response => response.data)
}

function add(person) {
    return axios.post(baseURL, person).then(response => response.data)
}

function remove(person) {
    return axios.delete(`${baseURL}/${person.id}`)
}

function updateNumber(person) {
    return axios.put(`${baseURL}/${person.id}`, person).then(response => response.data )
}

export default {getAll, add, remove, updateNumber}
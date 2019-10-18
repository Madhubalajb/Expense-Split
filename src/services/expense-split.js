import axios from 'axios';
const url = '/api/expenses'

const getData = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addData = (expense) => {
    const request = axios.post(url, expense)
    return request.then(response => response.data)
}

const deleteData = (expense_id) => {
    const request = axios.delete(`${url}/${expense_id}`)
    return request.then(response => response.data)
}

const updateData = (expense_id, expense) => {
    const request = axios.put(`${url}/${expense_id}`, expense)
    return request.then(response => response.data)
}

export default { getData, addData, deleteData, updateData }
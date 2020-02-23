import axios from 'axios'
const url = '/api/expenses'

const getData = async () => {
    const response = await axios.get(url)
    return response.data
}

const addData = async (expense)=> {
    const response = await axios.post(url, expense)
    return response.data
}

const deleteData = async (expense_id) => {
    const response = await axios.delete(`${url}/${expense_id}`)
    return response.data
}

const updateData = async (expense_id, expense) => {
    const response = await axios.put(`${url}/${expense_id}`, expense)
    return response.data
}

export default { getData, addData, deleteData, updateData }
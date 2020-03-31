import axios from 'axios'
const url = '/api/expenses'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getData = async () => {
    const response = await axios.get(url)
    return response.data
}

const addData = async (expense)=> {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(url, expense, config)
    return response.data
}

const deleteData = async (expense_id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${url}/${expense_id}`, config)
    return response.data
}

const updateData = async (expense_id, expense) => {
    const config = {
        header: { Authorization: token }
    }
    const response = await axios.put(`${url}/${expense_id}`, expense, config)
    return response.data
}

export default { setToken, getData, addData, deleteData, updateData }
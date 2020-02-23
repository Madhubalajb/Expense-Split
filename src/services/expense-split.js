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
        headers: { Authorization : token }
    }
    const response = await axios.post(url, expense, config)
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

export default { setToken, getData, addData, deleteData, updateData }
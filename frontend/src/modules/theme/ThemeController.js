import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL

export const getAllTheme = async () => {
  try {
    const response = await axios.get(`${API_URL}/theme`)
    return response
  } catch (error) {
    toast.error('Failed to get theme due to :' + error.response.data.message)
  }
}

export const getThemebyId = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/theme/${code}`)
    return response.data
  } catch (error) {
    toast.error('Failed to get theme due to :' + error.response.data.message)
  }
}

export const createTheme = async (data) => {
  try {
    await axios.post(`${API_URL}/theme`, data)
    toast.success('Theme created successfully.')
  } catch (error) {
    toast.error('Failed to create theme due to :' + error.response.data.message)
  }
}

export const updateTheme = async (data) => {
  const _id = data._id
  try {
    await axios.patch(`${API_URL}/theme/${_id}`, data)
    toast.success('Theme updated successfully.')
  } catch (error) {
    toast.error('Failed to update theme due to :' + error.response.data.message)
  }
}

export const deleteTheme = async (id) => {
  try {
    await axios.delete(`${API_URL}/theme/${id}`)
    toast.success('Theme removed successfully.')
  } catch (error) {
    toast.error('Failed to remove theme due to :' + error.response.data.message)
  }
}
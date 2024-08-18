import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL

// Funcion para obtener todos los temas
export const getAllTheme = async () => {
  try {
    const response = await axios.get(`${API_URL}/theme`)
    return response
  } catch (error) {
    toast.error('Failed to get theme due to :' + error.response.data.message)
  }
}

// Funcion para obtener un tema por su ID
export const getThemebyId = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/theme/${code}`)
    return response.data
  } catch (error) {
    toast.error('Failed to get theme due to :' + error.response.data.message)
  }
}

// Funcion para crear un tema
export const createTheme = async (data) => {
  try {
    await axios.post(`${API_URL}/theme`, data)
    toast.success('Theme created successfully.')
  } catch (error) {
    toast.error('Failed to create theme due to :' + error.response.data.message)
  }
}

// Funcion para actualizar un tema
export const updateTheme = async (data) => {
  const _id = data._id
  try {
    await axios.patch(`${API_URL}/theme/${_id}`, data)
    toast.success('Theme updated successfully.')
  } catch (error) {
    toast.error('Failed to update theme due to :' + error.response.data.message)
  }
}

// Funcion para eliminar un tema
export const deleteTheme = async (id) => {
  try {
    await axios.delete(`${API_URL}/theme/${id}`)
    toast.success('Theme removed successfully.')
  } catch (error) {
    toast.error('Failed to remove theme due to :' + error.response.data.message)
  }
}
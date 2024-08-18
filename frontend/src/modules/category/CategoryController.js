import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/category`)
    return response
  } catch (error) {
    toast.error('Failed to get category due to :' + error.response.data.message)
  }
}

export const getCategorybyId = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/category/${code}`)
    return response.data
  } catch (error) {
    toast.error('Failed to get category due to :' + error.response.data.message)
  }
}

export const createCategory = async (data) => {
  try {
    await axios.post(`${API_URL}/category`, data)
    toast.success('Category created successfully.')
  } catch (error) {
    toast.error('Failed to create category due to :' + error.response.data.message)
  }
}

export const updateCategory = async (data) => {
  const _id = data.get('_id')
  try {
    await axios.patch(`${API_URL}/category/${_id}`, data)
    toast.success('Category updated successfully.')
  } catch (error) {
    toast.error('Failed to update category due to :' + error.response.data.message)
  }
}

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/category/${id}`)
    toast.success('Category removed successfully.')
  } catch (error) {
    toast.error('Failed to remove category due to :' + error.response.data.message)
  }
}
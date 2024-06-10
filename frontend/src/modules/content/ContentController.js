import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL

export const getAllContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/content`)
    return response
  } catch (error) {
    toast.error('Failed to get content due to :' + error.response.data.message)
  }
}

export const getContentbyId = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/content/${code}`)
    return response.data
  } catch (error) {
    toast.error('Failed to get content due to :' + error.response.data.message)
  }
}

export const createContent = async (data) => {
  try {
    await axios.post(`${API_URL}/content`, data)
    toast.success('Content created successfully.')
  } catch (error) {
    toast.error('Failed to create content due to :' + error.response.data.message)
  }
}

export const updateContent = async (data) => {
  const _id = data.get('_id')

  try {
    await axios.patch(`${API_URL}/content/${_id}`, data)
    toast.success('Content updated successfully.')
  } catch (error) {
    toast.error('Failed to update content due to :' + error.response.data.message)
  }
}

export const deleteContent = async (id) => {
  try {
    await axios.delete(`${API_URL}/content/${id}`)
    toast.success('Content removed successfully.')
  } catch (error) {
    toast.error('Failed to remove content due to :' + error.response.data.message)
  }
}
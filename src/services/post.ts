import api from "./api"

export const getAllPost = async (page: number, limit: number) => {
  const res = await api.get(`/post?page=${page}&limit=${limit}`)
  return res.data
}

export const createPost = async (title: string, content: string, tags: string, image: File | null) => {
  const formData = new FormData()
  formData.append("title", title)
  formData.append("content", content)
  formData.append("tags", tags) // "tech,news,react"
  if (image) {
    formData.append("image", image)
  }

  const res = await api.post("/post/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res.data
}
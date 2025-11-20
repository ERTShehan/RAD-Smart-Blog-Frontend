import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../services/post"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return alert("Title and Content required")

    try {
      setLoading(true)
      await createPost(title, content, tags, image)
      alert("Post Created Successfully!")
      navigate("/post") // Redirect to posts page
    } catch (err) {
      console.error(err)
      alert("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-blue-400 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tech, coding, news"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Publish Post"}
        </button>
      </form>
    </div>
  )
}
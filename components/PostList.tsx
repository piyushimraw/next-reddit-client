import React, { useEffect, useState } from "react"
import axios from "axios"

import PostCard from "./post-card"

interface PostListProps {
  api: string
}

function PostList({ api }: PostListProps) {
  const [posts, setPosts] = useState<any>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const response = await axios.get(
      api
    )
    setPosts(response.data.data.children)
  }

  if (!posts) {
    return "loading..."
  }

  return posts.map((post: any) => {
    return (
      <PostCard
        title={post.data.title}
        key={post.data.id}
        description={post.data.author}
        content={post.data.selftext}
      />
    )
  })
}

export default PostList

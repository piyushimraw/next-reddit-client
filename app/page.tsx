"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostList from "@/components/PostList"
import PostCard from "@/components/post-card"

export default function Home() {
  const [posts, setPosts] = useState<any>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const response = await axios.get(
      `https://www.reddit.com/search.json?q=${search}`
    )
    setPosts(response.data.data.children)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    getPosts()
  }
  const clearResults = () => {
    setSearch("")
    setPosts([])
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center mb-4"
      >
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search for posts"
            onChange={handleSearch}
            value={search}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {posts.length === 0 ? (
        <Tabs defaultValue="hot">
          <TabsList className="flex justify-center">
            <TabsTrigger value="hot">Hot</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="rising">Rising</TabsTrigger>
          </TabsList>
          <TabsContent value="hot">
            <PostList
              api={`https://www.reddit.com/r/Home/hot.json?limit=5&amp;t=2022`}
            />
          </TabsContent>
          <TabsContent value="new">
            <PostList
              api={`https://www.reddit.com/r/Home/new.json?limit=5&amp;t=2022`}
            />
          </TabsContent>
          <TabsContent value="rising">
            <PostList
              api={`https://www.reddit.com/r/Home/rising.json?limit=5&amp;t=2022`}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className= "flex gap-4 mb-14 align-middle">
            <h1 className="text-2xl font-bold mb-4">Search results for {search}</h1>
            <Button  onClick={clearResults}>Clear Results</Button>
          </div>
          {posts.map((post, index) => (
            <PostCard 
              title={post.data.title}
              description={post.data.author}
              content={post.data.selftext}
            />
          ))}
        </>
      )}
    </div>
  )
}

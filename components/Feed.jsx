"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={() => handleTagClick(post)}
                />
            ))}
        </div>
    )
}



const Feed = () => {

    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [filteredPost, setFilteredPost] = useState([])


    const handleSearchChange = async (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchText(searchTerm)

        if (searchTerm.trim() === '') {
            setFilteredPost(posts)
        } else {
            const filtered = posts.filter((post) => {
                const hasTags = post.tag.toLowerCase().includes(searchTerm);
                const hasPrompt = post.prompt.toLowerCase().includes(searchTerm);

                return hasPrompt || hasTags

            });
            setFilteredPost(filtered)
        }
        console.log(posts)
    }

    const handleTagClick = (post) => {
        setSearchText(post.tag.toLowerCase())
        handleSearchChange({ target: { value: post.tag.toLowerCase() } });
    }


    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json()
            setPosts(data)
            setFilteredPost(data)
        }

        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input type="text" placeholder='search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={filteredPost}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed
"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'


const PromptCard = ({
    post,
    handleTagClick,
    handleEdit,
    handleDelete
}) => {

    const [copied, setCopied] = useState("")
    const { data: session } = useSession()
    const pathName = usePathname()
    const router = useRouter()



    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setCopied("")
        }, 3000)
    }


    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image
                        src={post.creator.image}
                        height={40}
                        width={40}
                        alt='user profile'
                        className='rounded-full object-contain'
                    />
                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-grey-900'>{post.creator.username}</h3>
                        <p className='font-inter text-sm text-grey-500'>{post.creator.email}</p>
                    </div>
                </div>

                <div className='copy_btn'
                    onClick={handleCopy}
                >
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        width={20}
                        height={20}
                        alt='copied or not'
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-grey-700">{post.prompt}</p>
            <p className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-grey-100 pt-3'>
                    <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
                    <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>

                </div>
            )}
        </div>
    )
}

export default PromptCard
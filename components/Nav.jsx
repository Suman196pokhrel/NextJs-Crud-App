"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    signIn,
    signOut,
    useSession,
    getProviders
} from "next-auth/react"


const Nav = () => {

    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)


    useEffect(() => {
        const setAuthPrviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }

        setAuthPrviders()
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"} className='flex gap-2 flex-center'>
                <Image
                    src={"/assets/images/logo.svg"}
                    width={40}
                    height={40}
                    alt='profile'
                />
                <p className='logo_text'>DiscPrompts</p>
            </Link>


            {/* DESKTOP NAVIGATION  */}
            <div className='sm:flex hidden'>
                {session?.user ?

                    <div className='flex gap-3 md:gap-5'>
                        <Link href={"/create-prompt"} className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>Sing Out</button>
                        <Link href={"/profile"}>
                            <Image className='rounded-full' src={session?.user.image} width={40} height={40} alt='profile' />
                        </Link>
                    </div>

                    :
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                }
            </div>


            {/* MOBILE NAVIGATION  */}
            <div className='sm:hidden flex relative'>
                {session?.user ?
                    <div className='flex'>
                        <Image
                            className='rounded-full'
                            src={session?.user.image}
                            width={40}
                            height={40}
                            alt='profile'
                            onClick={() => setToggleDropDown((prev) => !prev)}

                        />

                        {toggleDropDown &&
                            (<div className='dropdown'>
                                <Link href={"/profile"} className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                                    My Profile
                                </Link>
                                <Link href={"/create-prompt"} className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                                    Create Prompt
                                </Link>
                                <button type='button' onClick={() => {
                                    setToggleDropDown(false);
                                    signOut()
                                }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>)
                        }
                    </div>
                    :

                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                }
            </div>

        </nav>
    )
}

export default Nav
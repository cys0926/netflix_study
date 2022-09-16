import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import BasicMenu from './BasicMenu'
import { XMarkIcon } from '@heroicons/react/24/solid'
import useOnClickOutside from '../hooks/useOnClickOutside'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { searchValueState } from '../atoms/searchAtom'

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useRecoilState(searchValueState)
    const [isSearching, setIsSearching] = useState(false)
    const ref = useRef(null)
    const router = useRouter()
    const SHOW_HEADERS = ['/browse', '/search']
    const isShowHeader = SHOW_HEADERS.includes(router.route)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setSearchValue(event.target.value.trimStart())
    }

    useEffect(() => {
        if (router.route !== '/search' && searchValue) {
            router.push({
                pathname: '/search',
                query: { q: searchValue },
            })
        } else {
            searchValue
                ? router.replace({
                      pathname: `/search`,
                      query: { q: searchValue },
                  })
                : router.push('/browse')
        }
    }, [searchValue])

    useEffect(() => {
        if (router.route === '/browse') {
            setSearchValue('')
            setInputValue('')
        }
    }, [router])

    const handleClickOutside = () => {
        if (searchValue) {
            return
        }
        setIsSearching(false)
        setSearchValue('')
    }

    useOnClickOutside(ref, handleClickOutside)

    return isShowHeader ? (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="item-center flex space-x-2 md:space-x-10">
                <img
                    alt="netflix-logo"
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    onClick={() => {
                        if (router.route !== '/browse') {
                            router.push('/browse')
                        }
                    }}
                />

                <BasicMenu />

                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">홈</li>
                    <li className="headerLink">시리즈</li>
                    <li className="headerLink">영화</li>
                    <li className="headerLink">New! 요즘 대세 콘텐츠</li>
                    <li className="headerLink">내가 찜한 콘텐츠</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 text-sm font-light">
                <div
                    className={`flex w-8 py-1.5 transition-[width] duration-75 ease-linear ${
                        isSearching &&
                        'w-80 border border-[#DDD] bg-[#141414]/70 px-1'
                    }`}
                >
                    <MagnifyingGlassIcon
                        className={`mr-3 h-6 w-6 ${
                            !isSearching && 'hover:cursor-pointer'
                        }`}
                        onClick={() => setIsSearching((prev) => !prev)}
                    />
                    {isSearching && (
                        <>
                            <input
                                ref={ref}
                                className="w-full bg-black/0 text-white focus:outline-0"
                                type="text"
                                placeholder="제목, 사람, 장르"
                                value={inputValue}
                                onChange={handleChange}
                                autoFocus
                            />
                            {searchValue ? (
                                <XMarkIcon
                                    className="mx-0.5 h-6 w-6 hover:cursor-pointer"
                                    onClick={() => {
                                        setInputValue('')
                                        setSearchValue('')
                                        setIsSearching(false)
                                    }}
                                />
                            ) : (
                                <div className="mx-0.5 h-6 w-6"></div>
                            )}
                        </>
                    )}
                </div>

                <p className="hidden lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </div>
        </header>
    ) : (
        <></>
    )
}

export default Header

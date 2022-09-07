import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from "./BasicMenu";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

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

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="item-center flex space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
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
                <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
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
    )
}

export default Header

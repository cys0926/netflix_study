import { Movie } from '../../typings'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useSetRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const setShowModal = useSetRecoilState(modalState)
    const setCurrentMovie = useSetRecoilState(movieState)

    useEffect(() => {
        setMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        )
    }, [netflixOriginals])

    return (
        <div className="z-20 flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0  w-screen bg-gradient-to-b">
                <div className="relative top-0 left-0 -z-30 h-screen w-screen  ">
                    {movie && (
                        <Image
                            src={`${baseUrl}${
                                movie?.backdrop_path || movie?.poster_path
                            }`}
                            width={100}
                            height={100}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="top"
                        />
                    )}
                </div>
            </div>
            <h1 className="z-10 text-2xl font-bold md:text-4xl lg:text-7xl">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="z-10 max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {movie?.overview.length! < 200
                    ? movie?.overview
                    : movie?.overview.substr(0, 200) + '...'}
            </p>

            <div className="z-10 flex space-x-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                    재생
                </button>
                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}
                >
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                    상세 정보
                </button>
            </div>
        </div>
    )
}

export default Banner

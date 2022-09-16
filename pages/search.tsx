import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API_KEY, BASE_URL } from '../src/utils/requests'
import Head from 'next/head'
import Thumbnail from '../src/components/Thumbnail'
import { Movie } from '../typings'

function Search() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const router = useRouter()
    const searchTerm = router.query.q as string

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement

            if (window.innerHeight + scrollTop >= offsetHeight) {
                setIsFetching(true)
            }
        }

        setIsFetching(true)
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const fetchSearchMovie = useCallback(
        async (searchTerm: string) => {
            const request = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}&page=${page}&include_adult=false&region=KR`
            )
                .then((res) => res.json())
                .catch((error) => console.log(error.message))

            setMovies(
                movies.concat(
                    request.results.filter(
                        (data: Movie) => data.backdrop_path || data.poster_path
                    )
                )
            )
            setPage(request.page + 1)
            setHasNextPage(request.page < request.total_pages)
            setIsFetching(false)
        },

        [searchTerm, page]
    )

    // const fetchSearchMovie = async (searchTerm: string) => {
    //     const request = await fetch(
    //         `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}&page=${page}&include_adult=false&region=KR`
    //     )
    //         .then((res) => res.json())
    //         .catch((error) => console.log(error.message))
    //
    //     setMovies(
    //         movies.concat(
    //             request.results.filter(
    //                 (data: Movie) => data.backdrop_path || data.poster_path
    //             )
    //         )
    //     )
    //     setPage(request.page + 1)
    //     setHasNextPage(request.page < request.total_pages)
    //     setIsFetching(false)
    // }

    useEffect(() => {
        setMovies([])
        setIsFetching(true)
        setPage(1)
        setHasNextPage(true)
    }, [searchTerm])

    useEffect(() => {
        if (isFetching && hasNextPage && searchTerm) {
            fetchSearchMovie(searchTerm)
        } else if (!hasNextPage) {
            setIsFetching(false)
        } else if (movies.length < 20) {
            setIsFetching(true)
        }
    }, [isFetching, searchTerm])

    return (
        <div className="mt-40">
            <Head>
                <title>넷플릭스</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="">
                <div className="mx-10">
                    <div
                        className="grid grid-cols-2 gap-y-20
                       gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    >
                        {movies?.map((movie) => (
                            <Thumbnail movie={movie} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search

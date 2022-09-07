import Head from 'next/head'
import Header from '../src/components/Header'
import Banner from '../src/components/Banner'
import requests from '../src/utils/requests'
import { Movie } from '../typings'
import Row from '../src/components/Row'
import useAuth from '../src/hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../src/atoms/modalAtom'
import Modal from '../src/components/Modal'
import Plans from '../src/components/Plans'
import {
    getProduct,
    getProducts,
    Product,
} from '@stripe/firestore-stripe-payments'
import payments from '../src/lib/stripe'
import useSubscription from '../src/hooks/useSubscription'
import useList from '../src/hooks/useList'

interface Props {
    netflixOriginals: Movie[]
    trendingNow: Movie[]
    topRated: Movie[]
    actionMovies: Movie[]
    comedyMovies: Movie[]
    horrorMovies: Movie[]
    romanceMovies: Movie[]
    documentaries: Movie[]
    products: Product[]
}

const Home = ({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    products,
}: Props) => {
    const { logout, loading, user } = useAuth()
    const showModal = useRecoilValue(modalState)
    const subscription = useSubscription(user)
    const movie = useRecoilValue(movieState)
    const list = useList(user?.uid)

    if (loading || subscription === null) return null

    if (!subscription) return <Plans products={products} />

    return (
        <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
            <Head>
                <title>Home - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Banner netflixOriginals={netflixOriginals} />
                <section className="md:space-y-24">
                    <Row title="지금 뜨는 콘텐츠" movies={trendingNow} />
                    <Row title="Top 시리즈" movies={topRated} />
                    <Row title="액션 SF" movies={actionMovies} />
                    {/* My List Component*/}
                    {list?.length > 0 && (
                        <Row title="내가 찜한 콘텐츠" movies={list} />
                    )}
                    <Row title="코미디 영화" movies={comedyMovies} />
                    <Row title="호러 영화" movies={horrorMovies} />
                    <Row title="로맨틱한 영화" movies={romanceMovies} />
                    <Row title="다큐멘터리" movies={documentaries} />
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    )
}

export default Home

export const getServerSideProps = async () => {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch((error) => console.log(error.message))

    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ])

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
            products,
        },
    }
}

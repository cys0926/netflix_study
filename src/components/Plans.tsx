import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Product } from '@stripe/firestore-stripe-payments'
import Table from './Table'
import Loader from './Loader'
import { loadCheckout } from '../lib/stripe'

interface Props {
    products: Product[]
}

function Plans({ products }: Props) {
    const { logout, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(
        products[2]
    )
    const [isBillingLoading, setIsBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return
        loadCheckout(selectedPlan?.prices[0].id!)
        setIsBillingLoading(true)
    }

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="border-b border-white/10 bg-[#141414] ">
                <Link href="/">
                    <img
                        src="https://rb.gy/ulxxee"
                        alt="Netflix"
                        width={150}
                        height={90}
                        className="cursor-pointer object-contain"
                    />
                </Link>
                <button
                    onClick={logout}
                    className="text-lg font-medium hover:underline"
                >
                    Sign Out
                </button>
            </header>

            <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">
                    원하는 멤버십을 선택하세요.
                </h1>
                <h3 className="mb-3  font-light">
                    멤버십은 언제든지 변경하실 수 있습니다.
                </h3>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        영화와 TV 프로그램 무제한 시청
                    </li>{' '}
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        당신을 위한 추천 콘텐츠
                    </li>{' '}
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        언제든 해지 가능
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`planBox ${
                                    selectedPlan?.id === product.id
                                        ? 'opacity-100'
                                        : 'opacity-60'
                                }`}
                                onClick={() => setSelectedPlan(product)}
                            >
                                {product.name}
                            </div>
                        ))}
                        {/*<div className="planBox">스탠다드</div>*/}
                        {/*<div className="planBox">스탠다드</div>*/}
                        {/*<div className="planBox">스탠다드</div>*/}
                    </div>

                    <Table products={products} selectedPlan={selectedPlan} />

                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
                            isBillingLoading && 'opacity-60'
                        }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="lightgray" />
                        ) : (
                            '구독'
                        )}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Plans

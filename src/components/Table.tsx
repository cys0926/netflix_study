import React from 'react'
import { Product } from '@stripe/firestore-stripe-payments'
import { CheckIcon } from '@heroicons/react/20/solid'

interface Props {
    products: Product[]
    selectedPlan: Product | null
}

function Table({ products, selectedPlan }: Props) {
    return (
        <table>
            <tbody className="divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">월 요금</td>
                    {products.map((product) => (
                        <td
                            key={product.id}
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? 'text-[#e50914]'
                                    : 'text-[gray]'
                            }`}
                        >
                            {product.prices[0].unit_amount!}원
                        </td>
                    ))}
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">영상 화질</td>
                    {products.map((product) => (
                        <td
                            key={product.id}
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? 'text-[#e50914]'
                                    : 'text-[gray]'
                            }`}
                        >
                            {product.metadata['영상 화질']}
                        </td>
                    ))}
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">동시접속 가능 인원</td>
                    {products.map((product) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? 'text-[#E50914]'
                                    : 'text-[gray]'
                            }`}
                            key={product.id}
                        >
                            {product.metadata['동시접속 가능 인원']}
                        </td>
                    ))}
                </tr>

                <tr className="tableRow">
                    <td className="tableDataTitle">
                        노트북, TV, 스마트폰, 태블릿으로 시청
                    </td>
                    {products.map((product) => (
                        <td
                            className={`tableDataFeature ${
                                selectedPlan?.id === product.id
                                    ? 'text-[#E50914]'
                                    : 'text-[gray]'
                            }`}
                            key={product.id}
                        >
                            {product.metadata[
                                '노트북, TV, 스마트폰, 태블릿으로 시청'
                            ] === 'true' && (
                                <CheckIcon className="inline-block h-8 w-8" />
                            )}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}

export default Table

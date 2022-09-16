import Head from 'next/head'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import useAuth from '../src/hooks/useAuth'
import { useRouter } from 'next/router'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface Inputs {
    email: string
    password: string
}

function Home() {
    const { user } = useAuth()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit = () => {
        router.push('/login')
    }

    if (user) {
        router.replace('/browse')
    } else
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Head>
                    <title>Netflix</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Image
                    src="https://rb.gy/p2hphi"
                    layout="fill"
                    className="-z-10 !hidden opacity-60 sm:!inline"
                    objectFit="cover"
                />
                <header className="h-30 items-center">
                    <img
                        alt="netflix-logo"
                        src="https://rb.gy/ulxxee"
                        className="md:left-10 md:top-6"
                        width={150}
                        height={150}
                    />

                    <button
                        className="z-50 rounded bg-[#E50914] px-5 py-1.5"
                        onClick={() => router.push('/login')}
                    >
                        로그인
                    </button>
                </header>
                <form className="z-30" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="pb-5 text-center text-6xl font-bold leading-tight">
                        영화와 시리즈를
                        <br /> 무제한으로.
                    </h1>

                    <h2 className="pb-10 text-center text-2xl leading-tight">
                        다양한 디바이스에서 시청하세요. 언제든 해지하실 수
                        있습니다.
                    </h2>

                    <h3 className="pb-10 text-center text-lg leading-tight">
                        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면
                        이메일 주소를 입력하세요.
                    </h3>

                    <label className="inline-block flex h-[70px] w-full justify-center">
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            className="w-[500px] items-center justify-center border-b border-r border-black px-5 py-4 text-lg text-black"
                            {...register('email', { required: true })}
                        />
                        <button className="flex items-center justify-center border-b border-black bg-[#E50914] px-8 py-4 text-2xl">
                            시작하기
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </label>
                    {errors.email && (
                        <p className="p-1 text-[13px] font-light text-orange-500">
                            정확한 이메일 주소를 입력하세요.
                        </p>
                    )}
                </form>
            </div>
        )
}

export default Home

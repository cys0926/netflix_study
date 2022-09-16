import '../src/styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../src/hooks/useAuth'
import { RecoilRoot } from 'recoil'
import Header from '../src/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <AuthProvider>
                <Header />
                <Component {...pageProps} />
            </AuthProvider>
        </RecoilRoot>
    )
}

export default MyApp

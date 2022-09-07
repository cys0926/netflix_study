import '../src/styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import useAuth, { AuthProvider } from '../src/hooks/useAuth'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </RecoilRoot>
    )
}

export default MyApp

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     images: {
//         domains: ['image.tmdb.org', 'rb.gy'],
//     },
// }
//
// module.exports = nextConfig

const withTM = require('next-transpile-modules')([
    '@stripe/firestore-stripe-payments'
]) // pass the modules you would like to see transpiled

module.exports = withTM({
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org', 'rb.gy']
    }
})

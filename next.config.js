/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fa', 'en', 'ckb'],
    defaultLocale: 'fa',
    localeDetection: false
  }
}

module.exports = nextConfig

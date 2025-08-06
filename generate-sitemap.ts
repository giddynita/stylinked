import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve } from 'path'

const sitemap = new SitemapStream({ hostname: 'https://stylinked.netlify.app' })

const routes = [
  'auth/login',
  'auth/sign-up',
  'auth/verification/email',
  'auth/complete-registration',
  'auth/forgot-password',
  'auth/reset-password',
  '/',
  ' /marketplace',
  '/marketplace/product-name/product-id',
  '/cart',
  '/cart/checkout',
  '/vendors',
  '/vendors/vendor-name/vendor-id',
  '/account/dashboard',
  '/account/products',
  '/account/orders',
  '/account/settings',
  '/restricted_access',
]

const outputPath = resolve('./public/sitemap.xml')
const writeStream = createWriteStream(outputPath)

;(async () => {
  sitemap.pipe(writeStream)
  routes.forEach((route) =>
    sitemap.write({ url: route, changefreq: 'monthly', priority: 0.8 })
  )
  sitemap.end()
  await streamToPromise(sitemap)
})()

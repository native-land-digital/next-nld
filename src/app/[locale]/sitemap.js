import { db } from '@/lib/db/kysely'

export default async function sitemap() {

  const staticPages = [
    '/about/how-it-works',
    '/about/partners-and-contributors',
    '/about/roadmap',
    '/about/why-it-matters',
    '/auth/login',
    '/auth/logout',
    '/auth/reset-password',
    '/auth/signup',
    '/auth/verify-email',
    '/contact',
    '/how-to-contribute/fixes-and-adding-maps',
    '/how-to-contribute/jobs',
    '/how-to-contribute/translations',
    '/how-to-contribute/volunteer',
    '/resources/mobile-apps',
    '/resources/teachers-guide',
    '/resources/territory-acknowledgement',
    '/support',
    '/support/supporters-circle',
  ]

  const allPages = [{
    url: process.env.NEXTAUTH_URL
  },{
    url: `${process.env.NEXTAUTH_URL}/listings`
  },{
    url: `${process.env.NEXTAUTH_URL}/listings/territories`
  },{
    url: `${process.env.NEXTAUTH_URL}/listings/languages`
  },{
    url: `${process.env.NEXTAUTH_URL}/listings/treaties`
  },{
    url: `${process.env.NEXTAUTH_URL}/listings/greetings`
  },{
    url: `${process.env.NEXTAUTH_URL}/listings/placenames`
  }]

  staticPages.forEach(page => {
    allPages.push({
      url: `${process.env.NEXTAUTH_URL}${page}`
    })
  })

  const listings = await db.selectFrom('Entry')
    .select(['id', 'category', 'slug', 'updatedAt'])
    .distinctOn('id')
    .execute();

  listings.forEach(entry => {
    allPages.push({
      url: `${process.env.NEXTAUTH_URL}/listings/${entry.category}/${entry.slug}`,
      lastModified: new Date(entry.updatedAt)
    })
  })

  return allPages;
}

import { db } from '@/lib/db/kysely'

export default async function sitemap() {

  const staticPages = [
    '/about/how-it-works',
    '/about/our-team',
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
    url: `${process.env.NEXTAUTH_URL}/maps`
  },{
    url: `${process.env.NEXTAUTH_URL}/maps/territories`
  },{
    url: `${process.env.NEXTAUTH_URL}/maps/languages`
  },{
    url: `${process.env.NEXTAUTH_URL}/maps/treaties`
  }]

  staticPages.forEach(page => {
    allPages.push({
      url: `${process.env.NEXTAUTH_URL}${page}`
    })
  })

  const polygons = await db.selectFrom('Polygon')
    .select(['id', 'category', 'slug', 'updatedAt'])
    .distinctOn('id')
    .execute();

  polygons.forEach(polygon => {
    allPages.push({
      url: `${process.env.NEXTAUTH_URL}/maps/${polygon.category}/${polygon.slug}`,
      lastModified: new Date(polygon.updatedAt)
    })
  })

  return allPages;
}

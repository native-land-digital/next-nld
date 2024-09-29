'use server'

import { redirect } from '@/i18n/routing'

export async function navigate(url: string) {
  redirect(url)
}

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from '@/i18n/routing'

export async function navigate(url: string) {
  redirect(url)
}

export async function submitRevalidation(path: string) {
  revalidatePath(path)
}

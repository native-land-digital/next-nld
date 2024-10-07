'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function navigate(url: string) {
  redirect(url)
}

export async function submitRevalidation(path: string) {
  revalidatePath(path)
}

export async function setLanguageCookie(lang : string) {
  console.log('set', lang)
  const cookieStore = cookies();
  cookieStore.set('lang', lang);
}

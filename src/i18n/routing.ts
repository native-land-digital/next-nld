import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // locales: ['bxk', 'en', 'es', 'fa', 'fr', 'hi', 'kbh', 'ko', 'pen', 'pt-br', 'qu', 'sel', 'sw', 'yo', 'zh-CN'],
  locales : ['en'],
  defaultLocale: 'en',
  // localeDetection: false,
  localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);

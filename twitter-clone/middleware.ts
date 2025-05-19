import { getUserByLogin } from '@shared/api'
import { routes } from '@shared/consts'
import { cookies as _cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export const middleware = async (request: NextRequest) => {
  const isAuthPage = request.url.includes('/s/')

  if (isAuthPage) {
    const cookies = await _cookies()
    const userEmail = cookies.get('userId')?.value
    if (!userEmail) return NextResponse.redirect(new URL(routes.unAuth.login, request.url))
    getUserByLogin(userEmail).then((res) => {
      if (res.ok) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL(routes.unAuth.login, request.url))
      }
    }).catch(() => {
      return NextResponse.redirect(new URL(routes.unAuth.login, request.url))
    })
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}
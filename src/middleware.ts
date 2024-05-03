import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

const publicpaths = ['/authenticate','/signin','/signup','/resetpassword'];
const protectedpaths = ['/changepassword','/'];
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    if(publicpaths.includes(path) && token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(protectedpaths.includes(path) && !token){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}
 

export const config = {
  matcher: [
    '/authenticate','/signin','/signup','/','/changepassword','/resetpassword'
  ],
}
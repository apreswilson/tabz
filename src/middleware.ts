import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/encrypt';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import Organization from './models/Organization';

const nonProtectedRoutes = ['/login', '/signup'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = nonProtectedRoutes.includes(path);
  const sessionCookie = request.cookies.get('session')?.value;
  const decryptcookie = sessionCookie
    ? await decrypt(sessionCookie)
    : undefined;

  if (!decryptcookie) {
    (await cookies()).delete('session');
  }

  //Redirect Logic
  if (decryptcookie && isPublic) {
    return NextResponse.redirect(
      new URL(`/${decryptcookie.userData._id}/home`, request.nextUrl),
    );
  }

  if (!decryptcookie && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/:userId/(home|account|create-organization)'],
};

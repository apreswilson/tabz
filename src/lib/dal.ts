import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from './encrypt';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import User from '@/models/User';

export const verifySession = cache(async () => {
   const cookie = (await cookies()).get('session')?.value;

   if (cookie) {
      const session = await decrypt(cookie);
      return session.userData._id;
   }
   return false;
})


import { SignJWT, jwtVerify, errors } from "jose";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
   try {
      const { payload } = await jwtVerify(input, key, {
         algorithms: ['HS256'],
      })
      return payload;
   } catch (error) {
      if (error instanceof errors.JWTExpired) {
         return undefined;
      } else {
         throw error;
      }
   }
}

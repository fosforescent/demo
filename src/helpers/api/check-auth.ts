import { NextRequest, NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '@/app/config'
import { user, PrismaClient } from '@prisma/client'


export const checkAuth = async (): Promise<user> => {
    const prisma = new PrismaClient()


    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    const token = cookies().get('token')?.value || ''
    if (!token) {
        throw new Error('not logged in')
    }
    const user = await new Promise ((resolve, reject) => jwt.verify(token, serverRuntimeConfig.secret, async (err: any, decoded: any) => {
        if (err) {
            console.log('err', err)
            throw new Error('invalid token')
        } else {
            if (!decoded.username) {
                console.log('decoded', decoded)
                reject('invalid token')
                throw new Error('invalid token')
            }
            console.log('decoded', decoded)
            const user = await prisma.user.findUnique({where: {username: decoded?.['username'] as any as string}})
            console.log('user', user)
            if (!user) {
                reject('user not found')
                throw new Error('invalid token')
            }
            return resolve(user as user)
        }
    })) as user

    return user
}
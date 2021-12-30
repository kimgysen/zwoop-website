import {NextRequest, NextResponse} from 'next/server';
import {getToken, JWT} from "next-auth/jwt";
import {match} from 'node-match-path';
import jwt from 'jsonwebtoken';
import util from 'util';

const jwtVerifyAsync = util.promisify(jwt.verify);

const authenticatedPaths = ['/', '/ask', '/tags/*'];

const secret = process.env.SECRET;

const matchesAuthPath = (path: string) => {
    for (let authPath of authenticatedPaths) {
        const { matches } = match(authPath, path);
        if (matches)
            return true;
    }
    return false;
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // @ts-ignore
    const jwt: JWT | null = await getToken({ req, secret: secret! });

    if (jwt) {
        const token = (jwt?.accessToken as any).accessToken;

        try {
            // @ts-ignore
            await jwtVerifyAsync(token, secret);

            if (token) {
                switch (pathname) {
                    case '/login':
                        return NextResponse.redirect('/');

                }
            }

        } catch (e) {
            if (matchesAuthPath(pathname)) {
                return NextResponse.redirect('/login');
            }
        }

    } else {
        if (matchesAuthPath(pathname)) {
            return NextResponse.redirect('/login');
        }
    }


    return NextResponse.next();
}


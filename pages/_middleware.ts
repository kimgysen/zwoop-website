import {NextRequest, NextResponse} from 'next/server';
import {getToken, JWT} from "next-auth/jwt";
import {decode} from 'jwt-simple';
import {match} from 'node-match-path';


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
    const token: JWT | null = await getToken({ req, secret: secret! });

    if (token && token.accessToken) {
        const accessToken = (token?.accessToken as any).accessToken;

        try {
            // @ts-ignore
            const decoded = await decode(accessToken, secret)
            if (decoded) {
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


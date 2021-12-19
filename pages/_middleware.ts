import {NextRequest, NextResponse} from 'next/server';
import {getToken, JWT} from "next-auth/jwt";


const authenticatedPaths = ['/', '/ask'];

const secret = process.env.SECRET;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // @ts-ignore
    const token = await getToken({ req, secret: secret! });

    if (token && !isTokenExpired(token)) {

        switch(pathname) {
            case '/login':
                return NextResponse.redirect('/');

        }

    } else {
        if (authenticatedPaths.includes(pathname)) {
            return NextResponse.redirect('/login');
        }
    }

    return NextResponse.next();
}

const isTokenExpired = (token: JWT | null) => {
    return false;
}

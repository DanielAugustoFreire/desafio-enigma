import { NextResponse } from 'next/server';
import httpClient from './app/utils/httpclient.js';


async function isAuthenticated(request) {
    try{
        let cookie = request.cookies.get("token")
        if(cookie === undefined){
            return false;
        }

        const response = await httpClient.get_headers("/auth", cookie.value);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        
        return false;
    }
    catch(ex){
        return ex;
    }
}

export async function middleware(request) {
    
    const autenticado = await isAuthenticated(request);
    

    if (!autenticado) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();
    response.headers.set('x-authenticated-user', JSON.stringify(autenticado));

    return response;
}

export const config = {
    matcher: '/',
};
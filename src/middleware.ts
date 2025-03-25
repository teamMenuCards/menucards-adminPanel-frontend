// // middleware.js
// import { NextResponse } from "next/server"
// import subdomains from "./subdomains.json"

// export const config = {
// 	matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"]
// }

// export default async function middleware(req) {
// 	const url = req.nextUrl
// 	const hostname = req.headers.get("host")

// 	const allowedDomains = ["localhost:3001", "menu-cards.com"]

// 	const isAllowedDomain = allowedDomains.some((domain) =>
// 		hostname.includes(domain)
// 	)
// 	const subdomain = hostname.split(".")[0]

// 	if (isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)) {
// 		return NextResponse.next()
// 	}

// 	const subdomainData = subdomains.find((d) => d.subdomain === subdomain)

// 	console.log("subdomainData--", subdomainData)
// 	console.log("subdomain--", subdomain)
// 	console.log("path--", url)

// 	if (subdomainData) {
// 		return NextResponse.rewrite(
// 			new URL(`/${subdomain}${url.pathname}`, req.url)
// 		)
// 	}

// 	return new Response(null, { status: 404 })
// }

/***   This will help identifying if user is logged in or not  ****/
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	const sessionId = request.cookies.get("session-id")?.value

	// Check if the request is for the root path and if the user is authenticated
	// if (!sessionId) {
	// 	// Redirect to the login page if unauthenticated
	// 	return NextResponse.redirect(new URL("/authentication/login", request.url))
	// }

	return NextResponse.next()
}

export const config = {
	matcher: ["/"] // Apply middleware only to the root route
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getSubdomains } from './server/actions/getsubdomains';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const subdomains = await getSubdomains() as { subdomain: string; }[];

  try {
    // Define allowed Domains (localhost and production domain)
    const allowedDomains = ["localhost:3000", "cms.mohitshedge.me", "cms.astro-dev.tech" "cms.shoto.me"];

  
    // Verify if hostname exist in allowed domains
    const isAllowedDomain = hostname && allowedDomains.some(domain => hostname.includes(domain));

    // Extract the possible subdomain in the URL
    const subdomain = hostname ? hostname.split('.')[0] : '';

    // If we stay in a allowed domain and its not a subdomain, allow the request.
    if (isAllowedDomain && !subdomains?.some((d: { subdomain: string; }) => d.subdomain === subdomain)) {
      return NextResponse.next();
    }

    const subdomainData = subdomains?.find(d => d.subdomain === subdomain);

    if (subdomainData) {
      // Rewrite the URL in the dynamic route based in the subdomain
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }
    if (!subdomains?.some((d: { subdomain: string; }) => d.subdomain === subdomain)) {
      const mainDomainUrl = `http://${allowedDomains[0]}${req.nextUrl.pathname}`;
      return NextResponse.redirect(new URL(mainDomainUrl, req.url));
    }
  } catch (error) {
    console.error(error);
    // Handle the error accordingly
  }

  return new Response(null, { status: 404 });
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

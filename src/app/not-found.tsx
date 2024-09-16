import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-md text-center">
      <div className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-4xl font-bold text-primary-foreground">
        404
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">
        Oops, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <div className="mt-8">
        <Link
          href="#"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Go Back
        </Link>
      </div>
    </div>
  </div>
  )
}
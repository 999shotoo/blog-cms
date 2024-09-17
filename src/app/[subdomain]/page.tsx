import Link from "next/link";
import NotFound from "../not-found";
import { db } from "@/server/db";
import Navbar from "./(components)/Navbar";
import AllBlogsSection from "./(components)/allblogsection";
import Footer from "./(components)/Footer";

export async function generateMetadata({
  params,
}: {
  params: { subdomain: string };
}) {
  // read route params
  const id = params.subdomain;
  const tenant = params?.subdomain;
  const getsiteinfo = await db.site.findUnique({
    where: {
      subdomain: tenant,
    },
  });
  return {
    title: getsiteinfo?.title + "|| PixelCMS" || "PixelCMS",
    description:
      getsiteinfo?.description ||
      "PixelCMS is an open-source headless CMS for your next project.",
    openGraph: {
      images: getsiteinfo?.imageUrl || "/dashboard.png",
    },
  };
}
const blog = [
  {
    id: 1,
    title: "Blog Post 1",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-01",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Blog Post 2",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-05",
    author: "Jane Doe",
  },
  {
    id: 3,
    title: "Blog Post 3",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-10",
    author: "John Doe",
  },
  {
    id: 4,
    title: "Blog Post 4",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-12",
    author: "Jane Doe",
  },
  {
    id: 5,
    title: "Blog Post 5",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-15",
    author: "John Doe",
  },
  {
    id: 6,
    title: "Blog Post 6",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-18",
    author: "Jane Doe",
  },
  {
    id: 7,
    title: "Blog Post 7",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-20",
    author: "John Doe",
  },
  {
    id: 8,
    title: "Blog Post 8",
    excerpt: "This is a brief summary of the blog post.",
    imageUrl: "/dashboard.png",
    date: "2022-01-22",
    author: "Jane Doe",
  },
];
export default async function Component({
  params,
}: {
  params: { subdomain: string };
}) {
  const tenant = params?.subdomain;
  const getsiteinfo = await db.site.findUnique({
    where: {
      subdomain: tenant,
    },
  });
  if (!getsiteinfo) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar SiteName={getsiteinfo.subdomain} />
      <AllBlogsSection blogs={blog} />
      <Footer sitename={getsiteinfo.subdomain} />
    </>
  );
}

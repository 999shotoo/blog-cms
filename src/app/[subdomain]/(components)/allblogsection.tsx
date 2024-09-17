"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MagicCard } from "@/components/magicui/magic-card";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
}

interface AllBlogsSectionProps {
  blogs: BlogPost[];
}

export default function AllBlogsSection({ blogs }: AllBlogsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(1).slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="container mx-auto px-4 py-10">
      <MagicCard className="cursor-pointer flex-col my-8">
        <Link href={`/${blogs[0].id}`}>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-[60vh">
                <Image
                  src={blogs[0].imageUrl}
                  alt={blogs[0].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div className="p-6">
                <CardTitle className="text-2xl mb-2">
                  {blogs[0].title}
                </CardTitle>
                <p className="text-muted-foreground mb-4">{blogs[0].excerpt}</p>
                <CardFooter className="px-0 pt-4">
                  <p className="text-sm text-muted-foreground">
                    {blogs[0].date} by {blogs[0].author}
                  </p>
                </CardFooter>
              </div>
            </div>
          </CardContent>
        </Link>
      </MagicCard>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {currentPosts.map((blog) => (
          <MagicCard key={blog.id} className="cursor-pointer flex-col">
            <Link href={`/${blog.id}`}>
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{blog.title}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4">
                  {blog.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {blog.date} by {blog.author}
                </p>
              </CardFooter>
            </Link>
          </MagicCard>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {[...Array(Math.ceil((blogs.length - 1) / postsPerPage))].map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
              className={
                currentPage === Math.ceil((blogs.length - 1) / postsPerPage)
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

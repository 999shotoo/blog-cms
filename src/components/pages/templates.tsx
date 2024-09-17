"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagicCard } from "../magicui/magic-card";

// Mock data for templates
const templatesData = [
  {
    id: 1,
    name: "Brutal",
    description:
      "Brutal is a minimal neobrutalist theme for Astro. It's based on Neobrutalist Web Design, a movement that aims to create websites with a minimalistic and functional design. It has some integrations like Image Optimization, RSS, Sitemap, ready to get your SEO done right.",
    image: "https://i.ibb.co/9bM6G9T/image.webp",
    isPaid: false,
    demoLink: "https://brutal.elian.codes/",
    buyurl: "https://github.com/eliancodes/brutal",
  },
  {
    id: 2,
    name: "OpenBlog",
    description:
      "Openblog is an elegant, simple, and user-friendly blog. Focused on accessibility, SEO and performance.",
    image: "https://i.ibb.co/fCMVjHL/image.webp",
    isPaid: false,
    demoLink: "https://blog-template-gray.vercel.app/",
    buyurl: "https://github.com/danielcgilibert/blog-template",
  },
  {
    id: 3,
    name: "Pacamara",
    description:
      "Pacamara is a simple blog theme for Astro that uses md and mdx files to store your content.",
    image: "https://i.ibb.co/dbqjFPJ/image.webp",
    isPaid: false,
    demoLink: "https://pacamara-astro-6y7xr.kinsta.page/",
    buyurl: "https://github.com/palmiak/pacamara-astro",
  },
  {
    id: 4,
    name: "Microblog",
    description:
      "Discover the adaptability of Lexington's multipage themes, each equipped with a dynamic MDX Blog and flexible sections for effortless customization. Offering the freedom to uniquely tailor your site, all our themes ensure you're up and running in hours, not days.",
    image: "https://i.ibb.co/8YTYpZ8/image.webp",
    isPaid: false,
    demoLink: "https://microblog-theta.vercel.app/",
    buyurl: "https://example.com/buy/landing",
  },
  {
    id: 5,
    name: "Bookworm Light Astro",
    description:
      "Bookworm Light is a minimal multi-author Astro blog theme that is perfect for any kind of blog website. Whether you're interested in food, beauty, travel, photography, lifestyle, fitness, health, or other topics, this theme is a great fit. The theme is super fast and SEO-friendly which makes it easier for your content to be discovered by search engines.",
    image: "https://i.ibb.co/wcVkYXp/image.webp",
    isPaid: false,
    demoLink: "https://bookworm-light-astro.vercel.app/?ref=astrobuild",
    buyurl:
      "https://github.com/themefisher/bookworm-light-astro/?ref=astrobuild",
  },
  {
    id: 6,
    name: "Phanatik",
    description:
      "Phanatik - A fun and classic theme built with Astrojs and Talwind CSS for a blog or your personal website",
    image: "https://i.ibb.co/yB4gtwW/image.webp",
    isPaid: true,
    demoLink: "https://lexingtonthemes.com/viewports/phanatik/",
    buyurl: "https://lexingtonthemes.com/info/phanatik/",
  },
];

export default function TemplatesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 3;

  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templatesData.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  const totalPages = Math.ceil(templatesData.length / templatesPerPage);

  const handleDescriptionClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <MagicCard className="cursor-pointer flex items-center justify-center shadow-2xl text-3xl font-bold mb-8  h-[40vh]">
        <div className="flex-col items-center justify-center h-full">
          Project Templates
        </div>
      </MagicCard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTemplates.map((template) => (
          <MagicCard key={template.id} className="cursor-pointer flex-col">
            <CardHeader>
              <Image
                src={template.image}
                alt={template.name}
                width={300}
                height={200}
                className="rounded-t-lg object-cover w-full h-48"
              />
              <CardTitle className="mt-4 flex items-center justify-between">
                {template.name}
                <Badge variant={template.isPaid ? "default" : "secondary"}>
                  {template.isPaid ? "Paid" : "Free"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p
                className={`text-muted-foreground ${
                  expandedId === template.id ? "" : "line-clamp-3"
                }`}
                onClick={() => handleDescriptionClick(template.id)}
              >
                {template.description}
              </p>
            </CardContent>
            <CardFooter className="gap-4">
              <Link href={template.demoLink} target="_blank">
                <Button className="w-full">Live Demo</Button>
              </Link>
              <Link href={template.buyurl} target="_blank">
                <Button className="w-full">Get Now</Button>
              </Link>
            </CardFooter>
          </MagicCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  Zap,
  Globe,
  Lock,
  PanelsTopLeft,
  BookText,
  PlusIcon,
  RocketIcon,
  BookIcon,
  UserIcon,
  CodeIcon,
  FilePenIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, GiftIcon, CoffeeIcon } from "lucide-react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <main className="flex-1 py-2 max-w-[140vh]">
        <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Beautiful Blogs with Pixel Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The free, open-source CMS that empowers you to share your
                  stories with the world.
                </p>
              </div>
              <div className="space-x-4 flex">
                <Link href="/sign-up">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <PanelsTopLeft className="w-4 h-4" />
                    <span>Get Started</span>
                  </HoverBorderGradient>
                </Link>
                <Link href="/docs/getting-started">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <BookText className="w-4 h-4" />
                    <span>Read Docs</span>
                  </HoverBorderGradient>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="m-4">
          <NeonGradientCard className="items-center justify-center text-center">
            <Image
              src={"/dashboard.png"}
              alt={""}
              width={1300}
              height={1080}
              className="rounded-xl"
            />
          </NeonGradientCard>
        </div>
        <section className="py-20 mx-auto space-y-8 px-4">
          <div className="relative flex h-auto w-full overflow-hidden rounded-lg border rounded-xl bg-background  md:shadow-xl">
            <div className="w-full">
              <CardHeader className="space-y-2 p-6">
                <h2 className="text-2xl font-bold">Our Features</h2>
                <p className="text-muted-foreground">
                  Pixel Blog SaaS platform offers a comprehensive set of
                  features to power your online presence.
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <FilePenIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Powerful Blog CMS</h3>
                    <p className="text-muted-foreground">
                      Manage your content with our intuitive blog CMS, featuring
                      powerful editing tools and seamless publishing workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Robust API</h3>
                    <p className="text-muted-foreground">
                      Integrate your blog with other applications using our
                      comprehensive API, enabling seamless data exchange and
                      automation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Exceptional User Experience
                    </h3>
                    <p className="text-muted-foreground">
                      Provide your readers with a delightful and engaging
                      experience through our intuitive user interface and
                      responsive design.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <BookIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Comprehensive Documentation
                    </h3>
                    <p className="text-muted-foreground">
                      Explore our extensive documentation to quickly get up and
                      running with Pixel Blog, with detailed guides and
                      tutorials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <RocketIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Ease of Use</h3>
                    <p className="text-muted-foreground">
                      Our platform is designed with simplicity in mind, making
                      it easy for users of all skill levels to create and manage
                      their blog.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <PlusIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">And more...</h3>
                    <p className="text-muted-foreground">
                      Pixel Blog offers a wide range of additional features to
                      enhance your blogging experience, including analytics,
                      monetization tools, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
          </div>
        </section>
        <section className="m-4">
          <Card className="w-full bg-primary-foreground shadow-xl overflow-hidden md:flex md:flex-row">
            {/* Image Section */}
            <div className="h-[50vh] md:h-auto w-full md:w-1/2">
              <img
                src="/programmer-img1.jpg"
                alt="Me working on this project"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="ms-auto p-6 md:p-8 md:w-1/2">
              <CardHeader className="text-start p-0 mb-6">
                <CardTitle className="text-3xl font-bold ">
                  Our SaaS is Free Forever
                </CardTitle>
                <CardDescription className="text-lg">
                  But your support keeps us going
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center space-x-4">
                  <GiftIcon className="w-8 h-8 text-purple-400" />
                  <p className="text-xl font-semibold">
                    No hidden costs, no premium plans
                  </p>
                </div>
                <p>
                  We believe in providing value without barriers. Our service is
                  and will always be free for everyone.
                </p>
                <div className="border-t pt-6">
                  <h3 className="text-start text-xl font-semibold mb-4">
                    Support Our Mission
                  </h3>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex space-x-2">
                      <HeartIcon className="w-6 h-6 text-red-400" />
                      <span className="text-gray-300">Show your love</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CoffeeIcon className="w-6 h-6 text-yellow-400" />
                      <span className="text-gray-300">Buy us a coffee</span>
                    </div>
                  </div>
                  <div className="mt-6 text-start">
                    <Button
                      variant={"secondary"}
                      className="bg-[#12B8FF] font-semibold py-2 px-6 rounded-full"
                    >
                      Make a Donation
                    </Button>
                  </div>
                </div>
                <p className="text-start text-sm text-gray-500 mt-4">
                  Your contribution helps us maintain and improve our services
                  for everyone.
                </p>
              </CardContent>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

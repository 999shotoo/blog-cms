import Safari from "@/components/magicui/safari";
import { AnimatedBeamFeatures } from "@/components/ui/AnimatedBeamFeatures";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenTool, Zap, Globe, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <main className="flex-1 py-20">
        <section className="max-w-[90%] mx-auto py-12  flex items-start justify-between">
          <div className="container px-4 py-4 md:px-6">
            <div className="flex flex-col space-y-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create and Manage Your Blog with Ease
                </h1>
                <p className="mx-auto max-w-[700px]  md:text-xl ">
                  Powerful, intuitive, and designed for bloggers. Start your
                  blogging journey today with our all-in-one CMS solution.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started</Button>
              </div>
            </div>
          </div>
          <div className="">
            <Safari
              url="pixel.cms"
              className="size-full"
              src="/dashboard.png"
            />
          </div>
        </section>
        <section className="w-3/4 py-20 mx-auto space-y-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">Easy to Use</h2>
                <p className="text-sm ">
                  Intuitive interface designed for bloggers of all skill levels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Globe className="h-10 w-10" />
                <h2 className="text-xl font-bold">Zero Maintenance</h2>
                <p className="text-sm ">
                  No need to worry about server maintenance, updates, or
                  upgrades.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Lock className="h-10 w-10" />
                <h2 className="text-xl font-bold">Secure & Reliable</h2>
                <p className="text-sm ">
                  Your content is safe with our robust security measures.
                </p>
              </div>
            </div>
          </div>
          <AnimatedBeamFeatures />
        </section>
        <section className="w-full py-20  ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Start Blogging?
                </h2>
                <p className="mx-auto max-w-[600px] ">
                  Join thousands of content creators who trust our platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

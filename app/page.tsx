"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/listify-logo.svg"
              alt="Listify"
              width={70}
              height={50}
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </div>
        </div>
      </nav>
      <section className="container px-4 py-16 mx-auto text-center md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Your Personal To-Do List Manager
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Organize tasks and track to-dos for productivity.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="px-8 cursor-pointer border bg-blue-500"
              onClick={onDashboard}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

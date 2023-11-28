import React from "react";
import Link from "next/link";

import { Star } from "lucide-react";

import { Badge, getButtonClasses } from "@blueprint/ui";

import { Shell } from "@/components/shell";
import { cn, getGithubStars } from "@/lib/utils";

interface FeatureProps {
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        title: "Next.js + React 18",
        description: "Take advantage of React server components and the latest Next.js features.",
    },
    {
        title: "Shadcn UI",
        description: "Beautiful UI components built with RadixUI and Tailwind by shadcn.",
    },
    {
        title: "tRPC",
        description:
            "Create end-to-end typesafe APIs that can be called from the server and client.",
    },
    {
        title: "Next Auth",
        description: "Login with Github and manage user authentication and middleware.",
    },
    {
        title: "Prisma + PlanetScale",
        description: "Typesafe database ORM for MySQL deployed on PlanetScale.",
    },
    {
        title: "Stripe",
        description: "Manage payments and subscriptions using Stripe.",
    },
    {
        title: "Resend",
        description: "Build email templates with React Email and send them with Resend.",
    },
    {
        title: "More coming soon...",
        description: "I am always looking for more features to implement.",
    },
];

export default async function Home() {
    const stars = await getGithubStars();
    return (
        <div className="container flex flex-col items-center justify-center space-y-8">
            <div className="mt-24 space-y-4 text-center lg:w-2/3">
                <h1 className="text-5xl font-bold">
                    Your Application{" "}
                    <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                        Blueprint
                    </span>
                </h1>
                <p className="text-lg text-zinc-500">
                    Blueprint is a Next.js starter kit built to help you get your project off the
                    ground faster so you can focus less on the tedious setup and more on building
                    incredible experiences for your users.
                </p>
            </div>
            <Link
                href="https://github.com/jackquinlan/blueprint"
                target="_blank"
                className={cn(
                    getButtonClasses({ variant: "primary" }),
                    "flex w-fit items-center gap-1",
                )}
            >
                <Star className="h-4 w-4 fill-yellow-200 text-yellow-400" />
                Star on Github
                <Badge className="rounded-full" variant="success">
                    {stars}
                </Badge>
            </Link>
            <Shell className="flex w-full flex-col items-center justify-center space-y-4 pb-8 xl:w-2/3">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-bold">Features</h1>
                </div>
                <div className="flex w-full justify-center">
                    <div className="container grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Feature key={feature.title} {...feature} />
                        ))}
                    </div>
                </div>
            </Shell>
        </div>
    );
}

function Feature({ title, description }: FeatureProps) {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-medium">{title}</h1>
            <h4 className="text-sm text-zinc-500">{description}</h4>
        </div>
    );
}

import React from "react";

import { Button } from "@blueprint/ui";

import { Shell } from "@/components/shell";

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
        title: "Shadcn UI Components",
        description: "Beautiful UI components built with Radix UI and Tailwind CSS by shadcn.",
    },
    {
        title: "tRPC",
        description:
            "Create end-to-end typesafe APIs that can be called from server and client components.",
    },
    {
        title: "Next Auth",
        description: "Login with Github and manage user authentication and middleware.",
    },
    {
        title: "Prisma + PlanetScale",
        description:
            "Typesafe database ORM, automated migrations and auto-completion deployed on PlanetScale.",
    },
    {
        title: "Stripe",
        description: "Manage payments and subscriptions using the Stripe.",
    },
];

export default async function Home() {
    return (
        <div className="container flex flex-col items-center justify-center space-y-12">
            <div className="mt-24 space-y-4 text-center lg:w-2/3">
                <h1 className="text-5xl font-bold">
                    Your Application{" "}
                    <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                        Blueprint
                    </span>
                </h1>
                <p className="text-lg text-zinc-500">
                    Blueprint is a Next.js starter kit built to help you get your project off the
                    ground faster so you can focus less on the tedious setup and more on building
                    incredible experiences for your users.
                </p>
                <Button>Star on Github</Button>
            </div>
            <Shell className="flex w-full flex-col items-center justify-center space-y-4 xl:w-2/3">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold">Included Features</h1>
                </div>
                <div className="flex w-full justify-center">
                    <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex flex-col">
            <h1 className="text-xl font-medium">{title}</h1>
            <h4 className="text-sm text-zinc-500">{description}</h4>
        </div>
    );
}

import React from "react";
import Link from "next/link";

import { ChevronRight, Shapes } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { getServerAuthSession } from "@blueprint/auth";
import { getButtonClasses } from "@blueprint/ui";

import { cn } from "@/lib/utils";
import { type FeatureProps, features } from "@/lib/features";

export default async function Home() {
    const session = await getServerAuthSession();
    return (
        <div className="flex flex-col w-full space-y-24 px-4 sm:container">
            <div className="mt-24 space-y-4 text-center sm:text-left">
                <h1 className="text-6xl md:text-7xl">
                    Your Next Application<br />
                    <span className="font-medium bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                        Blueprint
                    </span>
                </h1>
                <p className="text-lg text-primary/80 sm:text-xl">
                    Blueprint is an open-source starter kit built to help you get your project off the ground faster so you can focus less on the tedious setup and more on building
                    incredible experiences for your users.
                </p>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Link
                        href={session ? "/tasks": "/signup"}
                        className={cn(
                            getButtonClasses({ variant: "primary", size: "lg" }),
                            "flex w-fit items-center gap-1 rounded-full",
                        )}
                    >
                        {session ? "Your Tasks" : "Get Started"}
                    </Link>
                    <Link
                        href="https://github.com/jackquinlan/blueprint"
                        target="_blank"
                        className={cn(
                            getButtonClasses({ variant: "outline", size: "lg" }),
                            "flex w-fit items-center gap-2 rounded-full",
                        )}
                    >
                        <GitHubLogoIcon className="h-4 w-4" />
                        Star on Github
                    </Link>
                </div>
            </div>
            <div className="space-y-4 pb-12">
                <div className="flex flex-col">
                    <h1 className="text-3xl">Built using a modern tech stack.</h1>
                    <h2 className="text-2xl text-primary/80">
                        Blueprint includes the features you need without being feature bloated.
                    </h2>
                </div>
                <Features />
                <FeatureCard 
                    title="Have a feature suggestion?"
                    description="We're always looking to improve Blueprint. If you have a feature suggestion, we'd love to hear it!"
                    link="https://github.com/jackquinlan/blueprint"
                    icons={<Shapes className="w-7 h-7" />}
                />
            </div>
        </div>
    );
}

function Features() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((feat, i) => (
                <FeatureCard key={i} {...feat} />
            ))}
        </div>
    );
}

function FeatureCard({ title, description, link, icons }: FeatureProps) {
    return (
        <div className="flex flex-col justify-between space-y-4 border border-border bg-zinc-50 dark:bg-card rounded-lg text-primary">
            <div className="flex flex-col gap-y-4 text-xl p-4">
                <h1 className="flex items-center gap-2 text-2xl font-medium">
                    {icons}
                    {title && title}
                </h1>
                {description}
            </div>
            <div className="bg-background rounded-b-lg border-t border-t-border px-4 py-2">
                <Link 
                    href={link} 
                    className={cn(
                        getButtonClasses({ variant: "outline", size: "lg" }),
                        "w-fit rounded-full bg-background gap-2",
                    )}
                    target="_blank"
                > 
                    Learn more <ChevronRight className="stroke-1 h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

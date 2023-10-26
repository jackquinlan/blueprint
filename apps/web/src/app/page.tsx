import React from "react";

import { getServerAuthSession } from "@blueprint/auth";

import { NewPostWizard } from "@/components/new-post-wizard";
import { api } from "@/trpc/server";

export default async function Home() {
    const currentSession = await getServerAuthSession();
    const posts = await api.post.getPosts.query();
    return (
        <div className="mt-5 flex w-full justify-center text-center">
            <div className="flex w-1/3 flex-col space-y-4">
                <NewPostWizard session={currentSession ?? undefined} />
                {posts.map((post) => (
                    <div key={post.id}>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

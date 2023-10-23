import React from "react";

import { api } from "@/app/_trpc/server";

export default async function Home() {
    const examples = await api.post.getPosts.query();
    return (
        <div className="mt-4 w-full text-center">
            {examples.map((post) => <p key={post.id}>{post.text}</p>)}
        </div>
    );
}

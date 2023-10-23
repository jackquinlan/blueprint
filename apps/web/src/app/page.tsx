import React from "react";

import { api } from "@/trpc/server";

export default async function Home() {
    const posts = await api.post.getPosts.query();
    return (
        <div className="mt-4 w-full text-center">
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
}

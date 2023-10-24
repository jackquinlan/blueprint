import React from "react";

import { Card, CardHeader } from "@blueprint/ui";
import { api } from "@/trpc/server";
import { LoginButton } from "./_components/login-button";

export default async function Home() {
    const posts = await api.post.getPosts.query();
    return (
        <div className="flex justify-center mt-5 w-full text-center">
            <div className="flex flex-col space-y-4 w-1/3">
                <Card>
                    <CardHeader className="p-4">
                        <LoginButton />
                    </CardHeader>
                </Card>
                {posts.map((post) => (
                    <div key={post.id}>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

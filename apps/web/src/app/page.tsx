import React from "react";

import { db } from "@blueprint/db";
import { Loader } from "@/components/loading-animation";

export default async function Home() {
    const examples = await db.example.findMany();
    return (
        <div className="mt-4 w-full text-center">
            <Loader />
            {examples.map((example) => <p key={example.id}>{example.text}</p>)}
        </div>
    );
}

import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@blueprint/auth";

import { Todolist } from "@/app/tasks/_components/todolist";

export default async function Tasks() {
    const session = getServerAuthSession();
    if (!session) {
        return redirect("/");
    }
    return (
        <div className="container flex w-full justify-center">
            <Todolist />
        </div>
    );
}

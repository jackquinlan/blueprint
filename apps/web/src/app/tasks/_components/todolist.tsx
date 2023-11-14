import React from "react";

import { format } from "date-fns";
import { Inbox } from "lucide-react";

import { api } from "@/trpc/server";
import { CreateTask } from "@/app/tasks/_components/create-task";
import { Task } from "@/app/tasks/_components/task";
import { Shell } from "@/components/shell";

export async function Todolist() {
    const tasks = await api.task.getUserTasks.query();

    return (
        <div className="flex w-full flex-col md:w-1/2">
            <div className="flex items-baseline gap-x-3">
                <h1 className="text-lg font-medium">Tasks</h1>
                <p className="text-xs">{format(new Date(), "iii, LLL do")}</p>
            </div>
            <div className="flex w-full flex-col gap-2">
                <CreateTask />
                {tasks.length === 0 && (
                    <Shell className="flex flex-col items-center">
                        <Inbox /> No tasks.
                    </Shell>
                )}
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

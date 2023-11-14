import React from "react";

import { format } from "date-fns";
import { Inbox } from "lucide-react";

import { CreateTask } from "@/app/tasks/_components/create-task";
import { Task } from "@/app/tasks/_components/task";
import { api } from "@/trpc/server";

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
                    <div className="flex flex-col justify-center">
                        <Inbox /> No tasks.
                    </div>
                )}
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

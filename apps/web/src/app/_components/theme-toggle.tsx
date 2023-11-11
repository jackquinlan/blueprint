"use client";

import React from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { ToggleGroup, ToggleGroupItem } from "@blueprint/ui";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    return (
        <ToggleGroup type="single" defaultValue="light">
            <ToggleGroupItem value="light" onClick={() => setTheme("light")}>
                <SunIcon className="h-4 w-4 transition-all" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" onClick={() => setTheme("dark")}>
                <MoonIcon className="h-4 w-4 transition-all" />
            </ToggleGroupItem>
            <ToggleGroupItem value="system" onClick={() => setTheme("system")}>
                <DesktopIcon className="h-4 w-4 transition-all" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}

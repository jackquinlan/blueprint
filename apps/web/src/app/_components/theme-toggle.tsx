"use client";

import React, { useState, useEffect } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { ToggleGroup, ToggleGroupItem } from "@blueprint/ui";

export function ThemeToggle() {
    const [mounted, setMounted] = useState<boolean>(false);
    const { setTheme, theme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <ToggleGroup type="single" defaultValue={theme}>
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

import React from "react";

export function Background() {
    return (
        <div className="relative h-full w-full">
            <div className="background-grid h-screen animate-pulse bg-[length:6rem_6rem]"></div>
            {/* <div className="animate-pulse background-grid-dark bg-[length:6rem_6rem] h-screen dark:hidden"></div> */}
        </div>
    );
}

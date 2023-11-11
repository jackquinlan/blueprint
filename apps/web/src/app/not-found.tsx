import { X } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            <X className="text-destructive h-16 w-16" />
            <h1 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-white">
                404 - Page Not Found
            </h1>
            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
}

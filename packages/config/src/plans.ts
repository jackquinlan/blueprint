export type SubscriptionPlan = {
    name: string;
    description: string;
    stripePriceId?: string;
    price: string;
    features: string[];
};

export const FREE_PLAN: SubscriptionPlan = {
    name: "Basic",
    description: "Get access to limited features for free.",
    stripePriceId: "",
    price: "Free",
    features: ["3 posts", "A basic feature"],
};

export const PREMIUM_PLAN: SubscriptionPlan = {
    name: "Premium",
    description: "Get access to more features.",
    stripePriceId: process.env.PREMIUM_PLAN_PRICE_ID || "",
    price: "$9.99/mo",
    features: ["Unlimited posts", "An awesome premium feature"],
};

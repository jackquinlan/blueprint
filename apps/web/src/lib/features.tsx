import React from "react";

import { ShieldCheck } from "lucide-react";

export interface FeatureProps {
    title?: string;
    description: string;
    link: string;
    icons?: React.ReactNode;
}

export const features: FeatureProps[] = [
    {
        title: "Powered by Vercel",
        description: "Blueprint uses both Next.js 14 and Turborepo as its build system. Deployed on Vercel.",
        link: "https://vercel.com",
        icons: (
            <svg className="w-7 h-7 fill-primary" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
        ),
    },
    {
        title: "Shadcn UI Components",
        description: "Beautifully designed, accessible, and customizable UI components built by shadcn.",
        link: "https://ui.shadcn.com",
        icons: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-primary">
                <rect width="256" height="256" fill="none" />
                <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
             </svg>
        ),
    },
    {
        title: "PlanetScale",
        description: "Blueprint uses MySQL for the database solution and is deployed using PlanetScale out of the box.",
        link: "https://planetscale.com",
        icons: (
            <svg className="w-8 h-8 fill-primary" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <g>
                    <path d="M256,128.044218 C255.976145,198.701382 198.701382,255.976145 128.044218,256 L128.044218,256 Z M128,0 C179.977309,0 224.718545,30.9806545 244.765091,75.4833455 L75.4833455,244.765091 C68.2193455,241.492945 61.3149091,237.562764 54.84736,233.050182 L159.8976,128 L128,128 L37.4903855,218.509382 C14.3269236,195.346036 0,163.346036 0,128 C0,57.30752 57.3075782,0 128,0 Z" className="fill-black dark:fill-white"></path>
                </g>
            </svg>
        ),
    },
    {
        title: "Prisma",
        description: "Simplify database management including queries, migrations, and modelling with a typesafe ORM.",
        link: "https://prisma.io",
        icons: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-primary" viewBox="0 -0.4499053178651202 258.5539889530368 310.4499053178651"><path d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 0 1-4.18 9.18h.007z"/><path fill="rgba(0, 0, 0, 0)" d="M0 0h256v310H0z"/></svg>
        ),
    },
    {
        title: "tRPC",
        description: "Build powerful, scalable, and end-to-end type-safe APIs with TypeScript.",
        link: "https://trpc.io",
        icons: (
            <svg className="w-8 h-8 fill-primary" viewBox="0 0 256 305" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <g>
                    <path d="M28.5708704,244.484126 L50.5523102,244.484126 L50.5523102,255.637394 L28.5708704,255.637394 L28.5708704,280.944808 C28.5265342,282.76088 28.7756436,284.572201 29.3085865,286.30888 C29.7121055,287.598035 30.4296418,288.766716 31.3966983,289.709876 C32.3287945,290.587845 33.462351,291.223324 34.6976653,291.560418 C35.9319973,291.889839 37.2008066,292.069526 38.4767452,292.09608 L39.0239328,292.098076 C40.1742698,292.098076 41.3621178,292.098076 42.5874768,291.935528 L43.3140897,291.845602 L43.3140897,291.845602 L44.7229024,291.686155 C45.1842376,291.631939 45.6383706,291.572922 46.0885025,291.4979 L46.7480957,291.393169 L46.7480957,291.393169 L47.9898595,291.208915 C48.3901768,291.148297 48.7792908,291.085279 49.1644036,291.010257 L50.0822651,290.826407 C50.2279097,290.796305 50.3699652,290.766435 50.5085474,290.736739 L51.2992883,290.560183 C51.4244408,290.53095 51.5463515,290.501775 51.6651363,290.472599 L53.1405685,300.863143 C51.9529863,301.533204 50.6949825,302.069952 49.3894696,302.463612 C47.9103362,302.931157 46.4026028,303.30287 44.8756472,303.576438 C43.2751783,303.876526 41.6121911,304.101592 39.8741819,304.26414 C38.1361727,304.426688 36.4606818,304.501709 34.785191,304.501709 C31.8202805,304.544468 28.8669683,304.122566 26.0326267,303.251343 C23.5070202,302.464809 21.2023779,301.094018 19.305656,299.250171 C17.3517683,297.337201 15.8779159,294.98932 15.0043958,292.398164 C13.9175935,289.178052 13.40136,285.792914 13.4789489,282.395233 L13.4789489,255.637394 L0,255.637394 L0,244.484126 L13.4414379,244.484126 L13.4414379,230.067403 L28.5708704,230.067403 L28.5708704,244.484126 Z M82.449155,273.755202 L82.449155,303.363876 L67.157175,303.363876 L67.157175,224.128163 L93.7774739,224.128163 C97.8028459,224.078186 101.814912,224.600218 105.693465,225.678617 C109.004878,226.592911 112.108472,228.138339 114.833643,230.22995 C117.339864,232.227503 119.326013,234.801346 120.622839,237.732148 C122.046484,240.990027 122.746119,244.518067 122.673439,248.072678 C122.706781,250.654818 122.365635,253.228156 121.660643,255.712416 C120.452308,260.03132 117.849851,263.829501 114.258474,266.515581 C112.430527,267.899417 110.450441,269.069849 108.356745,270.004103 L125.386734,302.701182 L125.386734,303.413891 L108.944417,303.413891 L94.0400508,273.755202 L82.449155,273.755202 Z M82.4616587,261.326561 L93.7774739,261.326561 C95.904348,261.36795 98.0215231,261.029202 100.029305,260.326267 C101.709053,259.729836 103.216273,258.729317 104.418091,257.412914 C105.354379,256.369363 106.072805,255.149315 106.53121,253.824363 C106.979269,252.465968 107.222724,251.0495 107.25446,249.621447 L107.256423,249.085474 C107.293697,247.183338 106.971284,245.291283 106.306144,243.50884 C105.708477,241.956053 104.72779,240.579651 103.455309,239.507668 C102.230793,238.519537 100.824829,237.78045 99.3165967,237.332031 C97.699552,236.860856 96.0282897,236.605407 94.3461733,236.571589 L82.4616587,236.569307 L82.4616587,261.326561 Z M150.306535,303.363876 L135.039562,303.363876 L135.039562,224.128163 L162.135,224.128163 C166.115261,224.071696 170.075137,224.706291 173.838429,226.003712 C177.125321,227.138139 180.158259,228.905229 182.766045,231.205236 C185.192373,233.459129 187.110522,236.204213 188.392693,239.257595 C189.665904,242.345312 190.339896,245.644964 190.381003,248.980587 L190.380776,249.648139 C190.415874,253.035465 189.738535,256.392341 188.392693,259.501026 C187.098244,262.46791 185.179049,265.120664 182.766045,267.278304 C180.149044,269.579203 177.101963,271.338606 173.800918,272.454821 C170.034613,273.737645 166.075844,274.363604 162.097489,274.305363 L150.294031,274.305363 L150.306535,303.363876 Z M150.306535,261.901729 L162.109993,261.901729 C164.044069,261.940675 165.967429,261.605255 167.774153,260.91394 C169.288775,260.319587 170.660779,259.412019 171.800332,258.250659 C172.84635,257.130186 173.650745,255.806552 174.163524,254.36202 C174.693771,252.885901 174.964512,251.329139 174.963759,249.760672 C174.975298,248.007586 174.70511,246.264031 174.163524,244.596659 C173.668933,243.050444 172.864892,241.621036 171.800332,240.395428 C170.675898,239.176286 169.302927,238.212647 167.774153,237.5696 C165.976266,236.842264 164.04896,236.489137 162.109993,236.531796 L150.306535,236.531796 L150.306535,261.901729 Z M253.349223,289.322262 C251.949056,292.411912 249.942052,295.18855 247.447494,297.487154 C244.882095,299.786976 241.885889,301.55495 238.632412,302.688678 C235.230903,303.853842 231.666218,304.465733 228.074184,304.502615 L227.304093,304.501709 C224.241116,304.538008 221.189898,304.116569 218.251441,303.251343 C215.564578,302.449416 213.029411,301.207184 210.749243,299.575266 C208.686234,298.058561 206.861397,296.242152 205.335157,294.186187 C203.728336,292.032629 202.385058,289.694486 201.333985,287.221647 C200.238208,284.521453 199.429359,281.713534 198.920778,278.844193 C198.342805,275.646719 198.058206,272.403121 198.069784,269.153854 L198.069784,258.488229 C198.063365,255.433607 198.318544,252.384012 198.833252,249.373059 C199.256734,246.929292 199.909832,244.531641 200.783483,242.211897 L201.121422,241.345707 C202.226759,238.44366 203.770103,235.728049 205.697763,233.293348 C207.523712,230.990372 209.686088,228.975526 212.112142,227.316597 C214.291728,225.909988 216.668425,224.835417 219.164208,224.128163 C221.599876,223.434222 224.11464,223.061414 226.644707,223.018354 L227.404122,223.015337 C231.354546,222.947713 235.286175,223.574065 239.020025,224.865879 C245.559969,227.112989 250.796219,232.098155 253.361727,238.519879 C254.800218,242.081434 255.681638,245.84328 255.974993,249.673146 L240.745531,249.673146 C240.655728,247.553743 240.302923,245.453711 239.695223,243.421315 C239.20464,241.781394 238.378605,240.26132 237.269513,238.957507 C236.144731,237.772515 234.756954,236.868746 233.218326,236.319234 C231.352613,235.679501 229.388474,235.374721 227.416626,235.41897 C226.288221,235.414964 225.163338,235.545081 224.065644,235.806584 C223.06672,236.050327 222.107041,236.433357 221.214809,236.944417 C219.685177,237.880271 218.399564,239.165885 217.46371,240.695516 C216.36906,242.448264 215.527185,244.346692 214.962977,246.334668 C214.469302,248.145428 214.126364,249.993946 213.937677,251.861287 C213.70926,254.020918 213.600728,256.191549 213.612582,258.363192 L213.612582,269.128846 C213.587744,271.95896 213.759037,274.787394 214.125232,277.593826 C214.405181,279.815785 214.94227,281.997707 215.725701,284.095731 C216.196483,285.290263 216.809407,286.423754 217.551236,287.47172 C218.218497,288.431612 219.037818,289.276273 219.976946,289.972453 C220.965431,290.703499 222.080214,291.246055 223.26541,291.572922 C224.5845,291.937069 225.948257,292.113852 227.316597,292.098076 C229.141315,292.119745 230.958637,291.862537 232.705675,291.335352 C234.236677,290.863864 235.636643,290.041865 236.794373,288.934649 C237.98284,287.754042 238.892732,286.322991 239.457654,284.745922 C240.180774,282.769681 240.602286,280.695845 240.70802,278.594119 L256,278.594119 C255.779336,282.302094 254.880899,285.938221 253.349223,289.322262 Z" className="fill-black dark:fill-white"></path>
                    <path d="M186.379603,92.4020709 L224.865879,114.62108 L224.865879,159.084107 L186.379603,181.303116 L169.294598,171.422722 L127.749927,195.407248 L86.4540783,171.560262 L69.6078929,181.303116 L31.1216177,159.046596 L31.1216177,114.62108 L69.6078929,92.4020709 L108.094168,114.62108 L108.094168,159.046596 L96.4507571,165.779818 L127.749927,183.853863 L159.297919,165.642278 L147.893328,159.046596 L147.893328,114.62108 L186.379603,92.4020709 Z M157.896259,126.199473 L157.896259,153.319918 L181.378138,166.873889 L181.378138,139.753443 L157.896259,126.199473 Z M214.862948,126.161962 L191.381069,139.715932 L191.381069,166.873889 L214.862948,153.282407 L214.862948,126.161962 Z M41.1245482,126.161962 L41.1245482,153.282407 L64.6064277,166.836378 L64.6064277,139.715932 L41.1245482,126.161962 Z M98.0912377,126.161962 L74.6093582,139.715932 L74.6093582,166.836378 L98.0912377,153.282407 L98.0912377,126.161962 Z M186.379603,103.980463 L162.897724,117.534434 L186.379603,131.100908 L209.861483,117.534434 L186.379603,103.980463 Z M69.6078929,103.942952 L46.1260135,117.534434 L69.6078929,131.063397 L93.0897724,117.534434 L69.6078929,103.942952 Z M88.7510013,35.0227606 L88.7510013,46.5636417 L53.1405685,67.1321676 L53.1405685,101.904855 L43.137638,107.681547 L43.137638,61.3554752 L88.7510013,35.0227606 Z M127.237277,0 L165.748559,22.2190095 L165.748559,34.4375891 L212.362215,61.3554752 L212.362215,107.393963 L202.359285,101.617271 L202.359285,67.1321676 L165.748559,45.9909739 L165.748559,66.6570284 L127.262284,88.8760379 L88.7760086,66.6570284 L88.7760086,22.2190095 L127.237277,0 Z M98.7789391,33.7598906 L98.7789391,60.880336 L122.235811,74.4343069 L122.235811,47.3263651 L98.7789391,33.7598906 Z M155.720621,33.7598906 L132.263749,47.3263651 L132.263749,74.4218033 L155.720621,60.880336 L155.720621,33.7598906 Z M127.237277,11.5533848 L103.780404,25.1073557 L127.237277,38.6613266 L150.719156,25.1073557 L127.237277,11.5533848 Z" className="fill-black dark:fill-white"></path>
                </g>
            </svg>
        ),
    },
    {
        title: "Next Auth",
        description: "Add authentication flows, manage users, and secure application routes with middleware using Next Auth.",
        link: "https://next-auth.js.org/",
        icons: (
            <ShieldCheck className="w-8 h-8 fill-primary" />
        ),
    },
    {
        title: "Resend",
        description: "The best package for sending emails to your users. Create email templates with ease using React Email.",
        link: "https://resend.com",
        icons: (
            <svg className="w-8 h-8 fill-primary" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M186 447.471V154H318.062C336.788 154 353.697 158.053 368.79 166.158C384.163 174.263 396.181 185.443 404.845 199.698C413.51 213.672 417.842 229.604 417.842 247.491C417.842 265.938 413.51 282.568 404.845 297.381C396.181 311.915 384.302 323.375 369.209 331.759C354.117 340.144 337.067 344.337 318.062 344.337H253.917V447.471H186ZM348.667 447.471L274.041 314.99L346.99 304.509L430 447.471H348.667ZM253.917 289.835H311.773C319.04 289.835 325.329 288.298 330.639 285.223C336.229 281.869 340.421 277.258 343.216 271.388C346.291 265.519 347.828 258.811 347.828 251.265C347.828 243.718 346.151 237.15 342.797 231.56C339.443 225.691 334.552 221.219 328.124 218.144C321.975 215.07 314.428 213.533 305.484 213.533H253.917V289.835Z" />
            </svg>
        ),
    },
    {
        title: "Stripe",
        description: "Manage payments, subscriptions, and more with Stripe. Blueprint comes with Stripe integration out of the box so you can start earning faster.",
        link: "https://stripe.com",
        icons: (
            <svg className="w-8 h-8 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.87 28.87" id="stripe"><g data-name="Layer 2"><g data-name="Layer 1"><rect width="28.87" height="28.87" rx="6.48" ry="6.48"></rect><path className="fill-white dark:fill-black" fill-rule="evenodd" d="M13.3 11.2c0-.69.57-1 1.49-1a9.84 9.84 0 0 1 4.37 1.13V7.24a11.6 11.6 0 0 0-4.36-.8c-3.56 0-5.94 1.86-5.94 5 0 4.86 6.68 4.07 6.68 6.17 0 .81-.71 1.07-1.68 1.07A11.06 11.06 0 0 1 9 17.25v4.19a12.19 12.19 0 0 0 4.8 1c3.65 0 6.17-1.8 6.17-5 .03-5.21-6.67-4.27-6.67-6.24z"></path></g></g></svg>
        ),
    },
];

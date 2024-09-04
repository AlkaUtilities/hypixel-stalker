declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            HYPIXEL_API: string;
            ANTICRASH: string;
        }
    }
}

export {};
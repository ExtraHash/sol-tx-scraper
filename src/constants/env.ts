import { loadEnv } from "../utils/loadEnv";

// load the environment variables
loadEnv();

export const { SOL_RPC_URI } = process.env as {
    SOL_RPC_URI: string;
};

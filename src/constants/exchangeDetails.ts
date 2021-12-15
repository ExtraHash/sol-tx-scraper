import { PublicKey } from "@solana/web3.js";
import { ExchangeDetails } from "../types";
import fs from "fs";

export const exchangeWallets: ExchangeDetails[] = JSON.parse(
    fs.readFileSync("exchanges.json").toString()
).map((details: any) => {
    return {
        name: details.name,
        address: new PublicKey(details.address),
    };
});

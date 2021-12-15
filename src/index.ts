import log from "electron-log";
import { Connection } from "@solana/web3.js";
import { sleep } from "./utils/sleep";
import { SOL_RPC_URI } from "./constants/env";
import { exchangeWallets } from "./constants/exchangeDetails";
import { ExchangeDetails } from "./types";
import sizeof from "object-sizeof";

// set up the sol rpc
const connection = new Connection(SOL_RPC_URI);

// program entry
async function main() {
    const scrapers = [];
    for (const exchange of exchangeWallets) {
        scrapers.push(monitorTransactions(exchange));
    }
    // this will never resolve
    await Promise.all(scrapers);
}

// monitor transactions loop
async function monitorTransactions(exchange: ExchangeDetails) {
    // this is the last known signature
    let lastSeen: string | undefined;

    log.info(
        "Fetching transactions every five seconds from " + exchange.address
    );

    while (true) {
        try {
            /* fetch signatures more recent than the last one known
            the first fetch will fetch 1000 transactions */
            const res: any = await connection.getSignaturesForAddress(
                exchange.address,
                {
                    until: lastSeen,
                }
            );

            // sometimes it returns no signatures (empty array)
            if (res.length > 0) {
                log.info("Scraped " + res.length + " transactions.");
                log.info(
                    "Average size of transaction: " +
                        (sizeof(res) / res.length + " bytes.")
                );
                lastSeen = res[0].signature;
            } else {
                log.info("Scraped 0 transactions.");
            }

            await sleep(5000);
        } catch (error) {
            log.error("Something is broken: " + (error as any).toString());
        }
    }
}

main();

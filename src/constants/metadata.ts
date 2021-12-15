import fs from "fs";
import { Metadata } from "../types";

const unformattedMetadata: Metadata[] = JSON.parse(
    fs.readFileSync("fullmetadata.json").toString()
);

export const metadata: Record<string, Metadata> = {};
for (const md of unformattedMetadata) {
    metadata[md.tokenMetadata.mint] = md;
}

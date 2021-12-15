import fs from "fs";

export const totalMint = JSON.parse(
    fs.readFileSync("mintids.json").toString()
) as string[];

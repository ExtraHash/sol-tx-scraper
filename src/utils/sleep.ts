export const sleep = (ms: number) => {
    return new Promise((res, rej) => setTimeout(res, ms));
};

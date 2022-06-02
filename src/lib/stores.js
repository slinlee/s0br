import { writable } from "svelte/store";

export const walletConnected = writable(false);
export const account = writable();
export const network = writable("");
export const commitments = writable([]);
export const balance = writable();
export const errorMsg = writable();
export const maticBalance = writable();

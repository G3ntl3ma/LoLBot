"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
// @ts-ignore
worker_threads_1.parentPort.on("message", (client) => {
    console.log("Finished Games Worker is Working");
});

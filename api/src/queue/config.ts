import { ConnectionOptions } from "bullmq";
interface QueueConfig {
    concurrency: number,
    connection: ConnectionOptions
}
export const config: QueueConfig = {
    concurrency: +(process.env.CONCURRENT_WORKERS || 8),
    connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: +(process.env.REDIS_PORT || 6379),
    }
}
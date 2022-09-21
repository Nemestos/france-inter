import { Queue, QueueScheduler } from "bullmq"
import { config } from "../config"
import { defaultWorker } from "../workers/worker"

export const defaultQueueName = "default-queue"
export const defaultQueue = new Queue(defaultQueueName, {
    connection: config.connection
})

export async function setupBullMqProcessor(queueName: string = defaultQueueName) {
    const queueScheduler = new QueueScheduler(queueName, {
        connection: config.connection
    })
    await queueScheduler.waitUntilReady()
    await defaultWorker(queueName)
}
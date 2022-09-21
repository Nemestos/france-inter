import { isEmpty, Job, Worker } from "bullmq"
import { JobWrapper } from "../jobs/job.interface"
import { getJobInstance } from "../jobs/provider"
import { WorkerReply } from "./worker.interface"
import { config } from "../config"
import { Logger } from "../../utils/logger"
export const defaultWorker = (queueName: string) => {
    const worker = new Worker<JobWrapper, WorkerReply>(
        queueName,
        async (job: Job) => {
            const instance = getJobInstance(job.data)
            if (isEmpty(instance)) {
                throw new Error(`Unable to find Job: ${job.data.name}`)
            }
            instance.handle()
            return { status: 200, message: "success" }
        },
        {
            concurrency: config.concurrency,
            connection: config.connection,

        }
    )
    worker.on("failed", (job: Job) => {
        const instance = getJobInstance(job.data)
        instance?.failed(job)
        Logger.error(`${job.id} has failed!`)
    })
}
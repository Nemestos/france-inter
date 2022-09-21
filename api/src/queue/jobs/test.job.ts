import { Job } from "bullmq";
import { Logger } from "../../utils/logger";
import { BaseJob, JobWrapper } from "./job.interface";

export class TestJob extends BaseJob implements JobWrapper {
    constructor(public payload: Record<string, unknown>) {
        super()
    }
    handle = (job?: Job | undefined) => {
        Logger.info(`handle job with id ${job?.id}`)

    }
    failed = (job: Job) => {
        Logger.error(`Job${job.name} with id: ${job.id} has failed`)
    }

}
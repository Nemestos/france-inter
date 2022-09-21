import { plainToInstance } from "class-transformer";
import { JobWrapper } from "./job.interface";
import { TestJob } from "./test.job";

export const JobDictionnary = new Map([
    [TestJob.name, TestJob]
])

export const getJobInstance = (data: JobWrapper): JobWrapper => {
    const jobClass = JobDictionnary.get(data.name)
    if (jobClass) {
        return plainToInstance(jobClass, data)
    }
    return {} as JobWrapper
}
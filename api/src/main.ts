import Hapi, { Request, ResponseToolkit, Server } from "@hapi/hapi";
import QueryString from "qs";
import { config } from "./config";
import { setupBullMqProcessor } from "./queue/queue/queue";
import { Logger } from "./utils/logger";

export let server: Server
export const init = async function (): Promise<Server> {
    server = Hapi.server({
        port: config.port,
        host: config.host,
        query: {
            parser: (query) => QueryString.parse(query)
        },
        router: {
            stripTrailingSlash: true
        }
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: async (r: Request, h: ResponseToolkit) => {
            return h.response({
                message: 'Hello World'
            })
        }
    })
    return server
}
export const start = async function (): Promise<void> {
    Logger.info(`Listening on ${server.settings.host}:${server.settings.port}`)
}
init()
    .then(() => {
        setupBullMqProcessor()
        start()
    })
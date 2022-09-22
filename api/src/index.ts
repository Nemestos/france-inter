import fastify from "fastify";
import config from "./plugins/config";
import now from 'fastify-now';

import { setupBullMqProcessor } from "./queue/queue/queue";
import { envToLogger } from "./utils/logger";
import path from "path";

// export let server: Server
// export const init = async function (): Promise<Server> {
//     server = Hapi.server({
//         port: config.port,
//         host: config.host,
//         query: {
//             parser: (query) => QueryString.parse(query)
//         },
//         router: {
//             stripTrailingSlash: true
//         }
//     })

//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: async (r: Request, h: ResponseToolkit) => {
//             return h.response({
//                 message: 'Hello World'
//             })
//         }
//     })
//     return server
// }
// export const start = async function (): Promise<void> {
//     Logger.info(`Listening on ${server.settings.host}:${server.settings.port}`)
// }
// init()
//     .then(() => {
//         setupBullMqProcessor()
//         start()
//     })

const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            coerceTypes: true,
            useDefaults: true
        }
    },
    logger: true
})
await server.register(config)
server.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

const start = async () => {
    try {
        setupBullMqProcessor()
        await server.listen({ host: server.config.API_HOST, port: server.config.API_PORT })
        server.log.info(`Listening on ${server.config.API_HOST}:${server.config.API_PORT}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()
export default server
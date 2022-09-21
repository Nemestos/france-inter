interface ServerConfig {
    port: number
    host: string
}

export const config: ServerConfig = {
    host: "localhost",
    port: +(process.env.API_PORT || 4001)
}
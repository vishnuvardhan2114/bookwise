import {Client as WorkFlowClient} from "@upstash/workflow"
import config from "./config"

export const workFlowClient = new WorkFlowClient({
    baseUrl:config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})
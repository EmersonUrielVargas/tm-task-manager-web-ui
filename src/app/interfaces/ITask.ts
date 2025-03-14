import { ETaskStatus } from "@app/enum/ETaskStatus";

export interface ITask {
    id: string,
    description: string,
    status: ETaskStatus,
    title: string
}
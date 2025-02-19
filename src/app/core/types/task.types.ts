export interface Task {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    pending: boolean;
    id?: string;
    uid: string;
}

export interface Response {
    ok: boolean
}

export interface GetAllUserTask extends Response {
    data: Task[]
}

export interface AddTask extends Response {
    data: Task
}

export interface NewTask {
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date
}

export interface UpdatedTask {
    completed?: boolean,
    pending?: boolean
}

export interface EventEmitterUpdated {
    id: string,
    completed: boolean,
    pending: boolean
}

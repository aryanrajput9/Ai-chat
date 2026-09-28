import type { IUser } from "./auth-type.ts";


declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export { };
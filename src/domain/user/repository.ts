import { User } from "./user.aggregate";

export interface IUserRepository{
    addUser(UserDetail: User): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    updateUserById(id: string, userDetail: User): Promise<boolean>;
    deleteUserById(id:string): Promise<boolean>
}
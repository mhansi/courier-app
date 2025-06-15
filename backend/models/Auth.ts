export enum Role {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
}

export interface TokenUser {
    userId: string;
    role: Role;
}

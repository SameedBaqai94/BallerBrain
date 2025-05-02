export interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    authProvider: string;
    createdAt?: Date;
    lastLogin?: Date;
    favoritePlayers?: string[];
    favoriteTeam?: string;
    role?: string;
}

export interface UserWriteDto {
    name: string;
    email: string;
    password: string;
    favoritePlayers?: string[];
    favoriteTeam?: string;
    role?: string;
}

export interface UserReadDto {
    name: string;
    email: string;
    favoritePlayers?: string[];
    favoriteTeam?: string;
}
export type diffDescription = {
    isEqual: boolean;
    path: string[];
}

export type hintOptions = {
    logger (...args: any): void;
}

export type hintUserOptions = {
    logger? (...args: any): void;
}
export type diffDescription = {
    changed: boolean;
    path: string[];
    value: { previous: any, next: any };
}
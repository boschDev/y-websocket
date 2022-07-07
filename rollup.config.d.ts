declare namespace _default {
    export const input: string;
    export function external(id: any): boolean;
    export const output: {
        name: string;
        file: string;
        format: string;
        sourcemap: boolean;
        paths: (path: any) => any;
    }[];
}
export default _default;

export function setPersistence(persistence_: {
    bindState: (arg0: string, arg1: WSSharedDoc) => void;
    writeState: (arg0: string, arg1: WSSharedDoc) => Promise<any>;
    provider: any;
} | null): void;
export function getPersistence(): null | {
    bindState: (arg0: string, arg1: WSSharedDoc) => void;
    writeState: (arg0: string, arg1: WSSharedDoc) => Promise<any>;
} | null;
/**
 * @type {Map<string,WSSharedDoc>}
 */
export const docs: Map<string, WSSharedDoc>;
export class WSSharedDoc extends Y.Doc {
    /**
     * @param {string} name
     */
    constructor(name: string);
    name: string;
    /**
     * Maps from conn to set of controlled user ids. Delete all user ids from awareness when this conn is closed
     * @type {Map<Object, Set<number>>}
     */
    conns: Map<any, Set<number>>;
    /**
     * @type {awarenessProtocol.Awareness}
     */
    awareness: awarenessProtocol.Awareness;
}
export function getYDoc(docname: string, gc?: boolean): WSSharedDoc;
export function setupWSConnection(conn: any, req: any, { docName, gc }?: any): void;
import * as Y from "yjs";
import * as awarenessProtocol from "y-protocols/awareness";

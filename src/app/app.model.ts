import { min } from "rxjs";

export class FolderModel {
    public name? : string;
    public id : string = '';
    public type : NODE_TYPES = NODE_TYPES.null;
    public children? : FolderModel[] = [];

    constructor( properties : Partial<FolderModel> = {} ) {
        Object.assign( this, properties );
    }
}

export enum NODE_TYPES {
    file = 'file',
    folder = 'folder',
    unset = 'unset',
    null = '',
}
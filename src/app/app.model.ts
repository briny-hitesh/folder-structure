export class FolderModel {
    public name? : string;
    public id : string = '';
    public type : 'folder' | 'file' | 'unset' | null = null;
    public children : FolderModel[] = [];

    constructor( properties : Partial<FolderModel> = {} ) {
        Object.assign( this, properties );
    }
}
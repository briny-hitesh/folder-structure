import { Component } from '@angular/core';
import { FolderModel, NODE_TYPES } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public folders : FolderModel[] = []; // Array of folder/file list

  public fileName: string = ''; // NgModel ref for the folder/file name.

  public nodeTypes : typeof NODE_TYPES = NODE_TYPES; // Allowed type to crete folder/file node

  /**
   * Function used to add blank node that allow user to add name and save.
   * @param folder element where need to add sub item in children 
   * @param type Define the type of node. Default : file
   */
  public addNewNode( folder : FolderModel, type : NODE_TYPES = NODE_TYPES.file ) : void {
    if (!folder.children) { // Check point if there is children undefined some how. It will add blank array.
      folder.children = [];
    }
    // Append new node with blank name.
    folder.children.push( this.createBlankNode( type ) );
  }

  /**
   * Function will update name of the node and update in list. 
   * @param folder node ref where need to update the name.
   */
  public updateAndSaveNode( folder : FolderModel ) {
    if ( this.fileName.trim() ) { // this will check that filename will not blank
      folder.name = this.fileName;
      this.fileName = '';
    }
  }

  /**
   * add new node in to root.
   */
  public addFolderToRoot() : void {
    // Append new node with blank name in root.
    this.folders.push( this.createBlankNode( NODE_TYPES.folder ) );
  }

  /**
   * Function that trigger a function to find element and remove node from array.
   * @param folder element which need to remove from the array list.
   */
  public removeNode( folder : FolderModel ) : void {
    console.log( folder )
    this.removeObjectById( this.folders, folder.id );
  }

  /**
   * Function to find element and remove node from array.
   * @param folders Array list where needs to find the node index to remove it.
   * @param id used to find node.
   */
  public removeObjectById( folders : FolderModel[], id : string ) : void {
    folders.forEach( ( folder : FolderModel, index : number ) => {
      if ( folder.id ===  id ) {
        folders.splice( index, 1 );
        return;
      } else if ( folder.children ) {
        this.removeObjectById( folder.children, id );
      }
    } );
  }

  /**
   * Function that return folder/file node.
   * @param type of the new node. default : file
   */
  public createBlankNode( type : NODE_TYPES = NODE_TYPES.file ) {
    return new FolderModel( {
      type,
      name: '',
      id : String(new Date().getTime()),
    } );
  }
}

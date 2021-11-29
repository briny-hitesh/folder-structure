import { Component } from '@angular/core';
import { FolderModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public folders : FolderModel[] = [];

  public fileName: string = '';

  public addFileName( folder : FolderModel, type : 'file' | 'folder' = 'file' ) : void {
    if (folder.children) {
      folder.children.push( {
        name: '',
        type: type,
        children: [],
        id: new Date().toDateString()
      } )
    }
  }

  public updateName( folder : FolderModel ) {
    if ( this.fileName ) {
      folder.name = this.fileName;
      this.fileName = '';
    }
  }

  public addFolderName( folder : FolderModel ) : void {
    if (!folder.children) {
      folder.children = [];  
    }
    folder.children.push( {
      name: '',
      type: 'file',
      children: [],
      id: new Date().toDateString()
    } );
  }

  public addFolderToRoot() : void {
    this.folders.push( new FolderModel( { name : '', children: [], type: 'folder', id: new Date().toDateString() } ) );
  }

  public removeFolder( folder : FolderModel ) : void {
    this.removeObjectById( this.folders, folder.id );
  }

  public removeObjectById( folders : FolderModel[], id : string ) : void {
    folders.forEach( ( folder : FolderModel, index : number ) => {
      if ( folder.id ===  id ) {
        folders.splice( index, 1 );
        return;
      } else {
        this.removeObjectById( folder.children, id );
      }
    } );
  }
}

import { CollectionViewer, DataSource } from '@angular/cdk/collections'

import { Observable } from 'rxjs/Observable'

import { IJPPhoto } from 'models/jpphoto'

export class JPPhotosDatasource extends DataSource<IJPPhoto> {
  public constructor(private jpphotos$: Observable<IJPPhoto[]>) {
    super()
  }

  public connect(collectionViewer: CollectionViewer): Observable<IJPPhoto[]> {
    return this.jpphotos$ // .do(console.log.bind(console))
  }

  public disconnect(collectionViewer: CollectionViewer): void {
  }
}

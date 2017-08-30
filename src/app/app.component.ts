import { Component, OnInit, ViewChild } from '@angular/core'
import { MdPaginator, MdSort, PageEvent, Sort } from '@angular/material'
import { Store } from '@ngrx/store'
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe'

import { Observable } from 'rxjs/Observable'

import { IJPPhoto } from 'models/jpphoto'
import { JPPhotosDatasource } from 'app/jpphotos.datasource'
import { IState } from 'app/redux/reducers'
import { LoadPhotosRequestAction } from 'app/redux/actions'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'rdt-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  public displayedColumns = [ 'albumId', 'id', 'title', 'url', 'thumbnailUrl' ]
  public dataSource: JPPhotosDatasource

  @ViewChild(MdPaginator)
  public paginator: MdPaginator
  @ViewChild(MdSort)
  public sort: MdSort

  private jpphotos$: Observable<IJPPhoto[]>
  private paginatorSubscription: Subscription = Subscription.EMPTY
  private sortSubscription: Subscription = Subscription.EMPTY

  public constructor(private store: Store<IState>) {
    this.jpphotos$ = this.store.select(state => state.app.photos)
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadPhotosRequestAction(this.paginator.pageIndex, this.paginator.pageSize || 25))

    this.paginatorSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store.dispatch(new LoadPhotosRequestAction(pageEvent.pageIndex, pageEvent.pageSize))
    })
    this.sortSubscription = this.sort.mdSortChange.subscribe((sort: Sort) => {
      // in case of sorting start with page 1 (pageIndex=0)
      this.store.dispatch(new LoadPhotosRequestAction(0, this.paginator.pageSize || 25, sort.active, sort.direction))
    })

    this.dataSource = new JPPhotosDatasource(this.jpphotos$)
  }
}

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { JPPhotoService, jsonPlaceholderURL } from 'app/core/jsonplaceholder/jpphoto.service'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: jsonPlaceholderURL,
      useValue: 'https://jsonplaceholder.typicode.com',
    },
    JPPhotoService,
  ],
})
export class JsonplaceholderModule {}

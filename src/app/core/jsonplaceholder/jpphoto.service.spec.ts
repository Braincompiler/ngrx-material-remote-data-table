import { TestBed, inject } from '@angular/core/testing';

import { JpphotoService } from './jpphoto.service';

describe('JpphotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JpphotoService]
    });
  });

  it('should be created', inject([JpphotoService], (service: JpphotoService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { CourseDetailResolverService } from './course-detail-resolver.service';

describe('CourseDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseDetailResolverService = TestBed.get(CourseDetailResolverService);
    expect(service).toBeTruthy();
  });
});

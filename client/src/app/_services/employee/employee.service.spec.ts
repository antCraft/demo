import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });
});
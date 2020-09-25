import { TestBed } from '@angular/core/testing';
import { FormDraftGuard } from './form-draft.guard';
import { FormDraftService, IFormDraftService } from './form-draft.service';

describe('FormDraftGuard', () => {
  let guard: FormDraftGuard;
  let formDraftService: IFormDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormDraftGuard,
        {
          provide: IFormDraftService,
          useClass: FormDraftService,
        },
      ],
    });
    guard = TestBed.inject(FormDraftGuard);
    formDraftService = TestBed.inject(IFormDraftService);
  });

  it('should inject guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should not deactivate when unsaved changes', () => {
    spyOnProperty(formDraftService, 'hasAnyDraft', 'get').and.returnValue(true);
    expect(guard.canDeactivate(null, null, null, null)).toBeFalsy();
  });

  it('should deactivate when function ignoreOnce() is called and should not deactivate after second call', () => {
    spyOnProperty(formDraftService, 'hasAnyDraft', 'get').and.returnValue(true);
    guard.ignoreOnce();
    expect(guard.canDeactivate(null, null, null, null)).toBeTruthy();
    expect(guard.canDeactivate(null, null, null, null)).toBeFalsy();
  });

  it('should deactivate when no unsaved changes', () => {
    spyOnProperty(formDraftService, 'hasAnyDraft', 'get').and.returnValue(
      false
    );
    expect(guard.canDeactivate(null, null, null, null)).toBeTruthy();
  });
});

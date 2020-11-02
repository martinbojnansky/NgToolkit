import { TestBed } from '@angular/core/testing';
import { FormDraftGuard } from './form-draft.guard';
import { FormDraftService, FormDraftServiceImpl } from './form-draft.service';

describe('FormDraftGuard', () => {
  let guard: FormDraftGuard;
  let formDraftService: FormDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormDraftGuard,
        {
          provide: FormDraftService,
          useClass: FormDraftServiceImpl,
        },
      ],
    });
    guard = TestBed.inject(FormDraftGuard);
    formDraftService = TestBed.inject(FormDraftService);
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

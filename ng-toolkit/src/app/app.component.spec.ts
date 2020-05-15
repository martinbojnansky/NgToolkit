import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LocalizationModule, LocalizationServiceConfig, Locale } from './localization/localization.module';
import { localizedValues } from './localization/en.locale';

class LocalizationServiceTestConfig extends LocalizationServiceConfig {
  readonly onImportLocale = (locale: Locale) => new Promise(resolve => resolve({ localizedValues: localizedValues }));
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, LocalizationModule],
      providers: [
        {
          provide: LocalizationServiceConfig,
          useClass: LocalizationServiceTestConfig
        }
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();   
  });
  
  it(`should have as title`, async () => {	
    const fixture = TestBed.createComponent(AppComponent);	
    const app = fixture.componentInstance;	
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').innerText).toEqual(localizedValues.welcomeMessage);	
  });
});

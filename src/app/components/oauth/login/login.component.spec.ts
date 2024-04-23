import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router'; 
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let oauthServiceSpy: jasmine.SpyObj<OauthService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let router: Router; // Declara una variable router

  beforeEach(async () => {
    const oauthSpy = jasmine.createSpyObj('OauthService', ['login']);
    const modalSpy = jasmine.createSpyObj('ModalService', ['openModalError']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: OauthService, useValue: oauthSpy },
        { provide: ModalService, useValue: modalSpy }
      ]
    }).compileComponents();

    oauthServiceSpy = TestBed.inject(OauthService) as jasmine.SpyObj<OauthService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    router = TestBed.inject(Router); // Inyecta el Router 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.hide).toBeTrue();
    component.toggle();
    expect(component.hide).toBeFalse();
  });

  it('should call login method when form is valid', () => {
    const username = 'testuser';
    const password = 'testpassword';
    component.loginForm.setValue({ usernameForm: username, passwordForm: password });

    oauthServiceSpy.login.and.returnValue(of({ token: 'testtoken', username: 'testuser', id: 1 }));

    component.login();

    expect(oauthServiceSpy.login).toHaveBeenCalledWith(username, password);
    expect(sessionStorage.getItem('access_token')).toBe('testtoken');
    expect(sessionStorage.getItem('user')).toBe('testuser');
    expect(sessionStorage.getItem('userId')).toBe('1');
  });

  it('should handle error when login fails', () => {
    const username = 'testuser';
    const password = 'testpassword';
    component.loginForm.setValue({ usernameForm: username, passwordForm: password });

    const error = new Error('Login failed');
    oauthServiceSpy.login.and.returnValue(throwError(error)); // Simula un error al llamar al método login

    component.login();

    expect(oauthServiceSpy.login).toHaveBeenCalledWith(username, password);
    expect(modalServiceSpy.openModalError).toHaveBeenCalled();
  });

  it('should navigate to registration page', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Usa router en lugar de component.router

    component.register();
 
    expect(navigateSpy).toHaveBeenCalledWith(['/singup']); // Cambia '/singup' a '/signup' si es necesario
  });
});

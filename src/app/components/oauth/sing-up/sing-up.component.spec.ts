import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpComponent } from './sing-up.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { of, throwError } from 'rxjs';
import { userProfile } from 'src/app/models/userProfile';

describe('SingUpComponent', () => {
  let component: SingUpComponent;
  let fixture: ComponentFixture<SingUpComponent>;
  let oauthServiceSpy: jasmine.SpyObj<OauthService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let router: Router;
  

  beforeEach(async () => {
    const oauthSpy = jasmine.createSpyObj('OauthService', ['singUpComponent']);
    const modalSpy = jasmine.createSpyObj('ModalService', ['openModalError', 'openModalInfo']);

    await TestBed.configureTestingModule({
      declarations: [SingUpComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: OauthService, useValue: oauthSpy },
        { provide: ModalService, useValue: modalSpy },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ]
    }).compileComponents();

    oauthServiceSpy = TestBed.inject(OauthService) as jasmine.SpyObj<OauthService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpComponent);
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

  it('should toggle password confirmation visibility', () => {
    expect(component.hide2).toBeTrue();
    component.toggle2();
    expect(component.hide2).toBeFalse();
  });

  it('should handle successful user registration', () => {
    const formValues = {
      nombre: 'Test',
      user: 'testuser',
      contraseña: 'password',
      contraseñaConfirm: 'password',
      apellidos: 'Test',
      email: 'test@example.com',
      emailConfirm: 'test@example.com',
      telefono: '123456789',
      edad: 25,
      RGPD: true
    };
    component.registroForm.setValue(formValues);

    const response = true;
    oauthServiceSpy.singUpComponent.and.returnValue(of(response));

    component.onSubmit();

    expect(oauthServiceSpy.singUpComponent).toHaveBeenCalledWith({
      name: formValues.nombre,
      apellidos: formValues.apellidos,
      username: formValues.user,
      email: formValues.email,
      password: formValues.contraseña,
      telefono: formValues.telefono,
      edad: formValues.edad,
      passwordActual: ""
    });
    expect(modalServiceSpy.openModalInfo).toHaveBeenCalledWith(`Benvingut/da! ${formValues.user}`);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle error during user registration', () => {
    const formValues = {
      nombre: 'Test', 
      user: 'testuser',
      contraseña: 'password',
      contraseñaConfirm: 'password',
      apellidos: 'Test',
      email: 'test@example.com',
      emailConfirm: 'test@example.com',
      telefono: '123456789',
      edad: 25,
      RGPD: true
    }; 
    component.registroForm.setValue(formValues);

    const error = {
      error:{
        message:"error",
      }
    }
    oauthServiceSpy.singUpComponent.and.returnValue(throwError(error));

    component.onSubmit();

    expect(modalServiceSpy.openModalError).toHaveBeenCalled();
  });

  it('should navigate to login page', () => {
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

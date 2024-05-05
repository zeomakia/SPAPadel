import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PerfilUserComponent } from './perfil-user.component';
import { OauthService } from 'src/app/services/oauth.service';
import { ModalService } from 'src/app/services/modal.service';

describe('PerfilUserComponent', () => {
  let component: PerfilUserComponent;
  let fixture: ComponentFixture<PerfilUserComponent>;
  let oauthServiceSpy: jasmine.SpyObj<OauthService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;
  const mockWindow = {
        location: {
          reload: () => {}
        }
      };
  beforeEach(async () => {
    const spyOauthService = jasmine.createSpyObj('OauthService', ['getUser', 'updateUser']);
    const spyModalService = jasmine.createSpyObj('ModalService', ['openModalError', 'openModalInfo']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
   
    await TestBed.configureTestingModule({
      declarations: [ PerfilUserComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: OauthService, useValue: spyOauthService },
        { provide: ModalService, useValue: spyModalService },
        { provide: Router, useValue: spyRouter },
        { provide: Window, useValue: mockWindow },
      ]
    })
    .compileComponents();
    formBuilder = TestBed.inject(FormBuilder);
    oauthServiceSpy = TestBed.inject(OauthService) as jasmine.SpyObj<OauthService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
  });

  beforeEach(() => {
   
    fixture = TestBed.createComponent(PerfilUserComponent);
    component = fixture.componentInstance;
    component.perfilUser = formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      user: new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', Validators.required),
      actualPassword: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    }, { validator: component.checkPasswords });
    oauthServiceSpy.getUser.and.returnValue(of({ /* tu objeto de respuesta aquí */ }));
    fixture.detectChanges();
  });

  it('should create', () => {
    // oauthServiceSpy.getUser.and.returnValue(of("user"));
    expect(component).toBeTruthy();
  });
  it('should ngOninit with user', () => {
    oauthServiceSpy.getUser.and.returnValue(of({
      name: 'nombre inicial',
      apellidos: 'apellidos iniciales ',
      username: 'usuario inicial',
      email: 'email inicial',
      edad: 'edad inicial',
      telefono: 'telefono inicial',
      actualPassword: 'contraseña actual inicial',
      password: 'contraseña inicial',
      confirmPassword: 'confirmar contraseña inicial'
    }));
    // oauthServiceSpy.getUser.and.returnValue(of("user"));
   // Simula que sessionStorage tiene un userId
   spyOn(sessionStorage, 'getItem').and.callFake((key) => {
    if (key === 'userId') {
      return 'mockUserId';
    }
    return null;  // Devuelve null cuando la clave no es 'userId'
  });
    component.ngOnInit();
    expect(oauthServiceSpy.getUser).toHaveBeenCalled();
  });
  it('should ngOninit without user', () => {
    oauthServiceSpy.getUser.and.returnValue(of({
      name: 'nombre inicial',
      apellidos: 'apellidos iniciales ',
      username: 'usuario inicial',
      email: 'email inicial',
      edad: 'edad inicial',
      telefono: 'telefono inicial',
      actualPassword: 'contraseña actual inicial',
      password: 'contraseña inicial',
      confirmPassword: 'confirmar contraseña inicial'
    }));
   // Simula que sessionStorage tiene un userId
   spyOn(sessionStorage, 'getItem').and.callFake((key) => {
    
    return null;  // Devuelve null cuando la clave no es 'userId'
  });
    component.ngOnInit();
    expect(oauthServiceSpy.getUser).toHaveBeenCalled();
  });
  
  it('should onsubmit', () => {
    // oauthServiceSpy.getUser.and.returnValue(of("user"));
    component.onSubmit();

  });
  it('should oncancel', () => {
    // oauthServiceSpy.getUser.and.returnValue(of("user"));
    component.onCancel();
    
  });
  it('should toogle', () => {
    // oauthServiceSpy.getUser.and.returnValue(of("user"));
    component.toggle();
    component.toggle2();
    component.toggle3();
  });
  it('should updateUser', () => {
    oauthServiceSpy.updateUser.and.returnValue(of("user"));
    component.updateUserProfile();
    expect(modalServiceSpy.openModalInfo).toHaveBeenCalled();
  });
});
	

import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Login, User } from '../../model/userModel';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,NgStyle ,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  selectedNumber: string = '';
  registerForm:FormGroup;
  loginForm:FormGroup;
  isSame: boolean = false;

  constructor(private fb:FormBuilder , private userService:UserService , private route:Router){

    this.registerForm = this.fb.group({

      username:['',[Validators.required ,Validators.min(6)]],
      password:['',[Validators.required , Validators.min(6)]],
      passwordConfirm:['' , [Validators.required ,Validators.min(6)]],
      selectedNumber: [''] 
      
    },{ validators: this.passwordMatchValidator() })


    this.loginForm = this.fb.group({

      username:['',[Validators.required ]],
      password:['',[Validators.required ]]

    })

  }

  loginUser(){
    if(!this.loginForm.invalid){
      
      

      this.userService.login(this.loginForm.value.username , this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log('Usuario inicio sesion:', response);
          this.registerForm.reset();
          this.route.navigate(['dashboard' , this.loginForm.value.username])
        },
        error: (err) => {
          console.error('Error al iniciar el usuario:', err);
          alert('Ocurrió un error al registrar el usuario');
        }
      });

    }
  }

  addUser(){
    
    if(!this.registerForm.invalid){
      console.log(this.registerForm.value)

     

  
      const newUser: User = {
        username_user: this.registerForm.value.username,
        password_user: this.registerForm.value.password,
        company: {
          id_company: this.registerForm.value.selectedNumber, 
        },
      };

      console.table(newUser);

      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          alert('Usuario registrado con éxito');
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          alert('Ocurrió un error al registrar el usuario');
        }
      });



        this.animationLogin();

     
    }else{
      console.log('registerform invalid')
    }
  }

  animationRegister(){
    const container = document.getElementById('container');
    container?.classList.add("active");
  }

  animationLogin(){
    const container = document.getElementById('container');
    container?.classList.remove("active");
  }

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const passwordConfirm = form.get('passwordConfirm')?.value;
  
      return password && passwordConfirm && password !== passwordConfirm
        ? { passwordsDoNotMatch: true }
        : null;
    };
  }
}

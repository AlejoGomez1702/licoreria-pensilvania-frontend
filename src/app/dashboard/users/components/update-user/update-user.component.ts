import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Usuario } from '../../interfaces/usuario.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  tempImg = '';
  nombreUsuario = '';
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {
    this.form = this.formBuilder.group({
      id: [''],
      state: [false],
      google: [''],
      name: [{
        value: '',
        disabled: true
      }, [Validators.required]],
      email: [{
        value: '',
        disabled: true
      }, [Validators.required]],
      rol: [''],
      establishment: [''],
      username: [{
        value: '',
        disabled: true
      }, [Validators.required]],
      img: ['']
    })
  }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (res) => {
        this.form.patchValue(res?.user);
        this.tempImg = res?.user.img;
        this.nombreUsuario = res?.user.name;
      }
    )
  }

  editImage() {}

}

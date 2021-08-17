import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService 
{

  constructor(
  ) { }

  presentSuccess( msg: string )
  {
    Swal.fire(
      'Correcto!',
      msg,
      'success'
    );
  }

  presentDelete( id: string )
  {
    return Swal.fire({
      title: 'Estas Seguro?',
      text: "La persona se registrará en lista negra!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Estoy seguro'
    });
  }

  async presentSupport()
  {
    const { value: ammount } = await Swal.fire({
      title: 'Cantidad de Apoyos',
      input: 'number',
      inputAttributes: {
        min: '1'
      },
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      width: 260,
      inputValue: 1,
      showCancelButton: true
    });
    
    if (ammount) 
    {
      this.presentSuccess(`Se Agregaron ${ammount} Apoyos`);
    }
  }

  presentError(error: string)
  {
    Swal.fire({
      title: 'ERROR',
      text: error,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  }

}

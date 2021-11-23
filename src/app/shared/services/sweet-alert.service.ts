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

  presentDelete( name: string )
  {
    return Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminará: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Estoy seguro'
    });
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

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus=inject(AuthService)
  const router = inject(Router)

  if(authStatus.islogged()){
    return true
  }
  else{
    Swal.fire("Pleazse login again!")
    router.navigateByUrl("")
    return false
  }
  
 
  
};

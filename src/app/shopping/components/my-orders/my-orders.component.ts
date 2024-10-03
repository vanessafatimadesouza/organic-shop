import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService){

      this.orders$ = authService.user$.pipe(
        switchMap( u => {
          if(u)
            return orderService.getOrdersByUser(u.uid);
          return of([]);
         } 
        )
      )
    }
}

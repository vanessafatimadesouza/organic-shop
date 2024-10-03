import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { switchMap, of, map, Observable } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order$!: Observable<any>; // Mudamos para um Observable

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.order$ = this.authService.user$.pipe(
      switchMap(user => {
        const orderId = this.route.snapshot.paramMap.get('id'); // Captura o ID do pedido
        if (user && orderId) {
          return this.orderService.getOrdersByUser(user.uid).pipe(
            // Filtrando para encontrar o pedido específico
            map(orders => orders.find(order => order.key === orderId) || null)
          );
        }
        return of(null); // Retorna null se não houver usuário ou ID do pedido
      })
    );
  }
}
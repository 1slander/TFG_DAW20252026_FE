import { Component, inject, signal } from '@angular/core';
import { TableService } from '../../core/services/table.service';
import { TableResponseInterface } from '../../interfaces/table';
import { NotificationService } from '../../core/services/notification.service';
import { MaterialModule } from '../../shared/ui/material-modules';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { RestaurantService } from '../../core/services/restaurant.service';
import { RestaurantsResponseInterface } from '../../interfaces/restaurant';
import { ScreenSizeService } from '../../core/services/screen-size';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  imports: [
    CreatePanelComponent,
    DynamicFormComponent,
    SearchBoxComponent,
    MaterialModule,
    CommonModule,
  ],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class TablesComponent {
  public screenSize = inject(ScreenSizeService);
  public tablesService = inject(TableService);
  private notificationService = inject(NotificationService);
  private restaurantService = inject(RestaurantService);

  tableList = signal<TableResponseInterface[]>([]);
  restaurants = signal<RestaurantsResponseInterface[]>([]);
  restaurantName = signal<string>('Cargando...');
  idRestaurant = signal<number>(0);

  displayedColumns: string[] = ['tableNumber', 'tableCapacity', 'status'];

  ngOnInit(): void {
    this.getDatosIniciales();
  }

  getDatosIniciales() {
    this.loadRestaurant();
  }

  loadRestaurant() {
    this.restaurantService.getEmployeeRestaurant().subscribe({
      next: (data: RestaurantsResponseInterface) => {
        const restaurant = data;
        console.log(restaurant);

        if (!restaurant) return;

        this.idRestaurant.set(restaurant.idRestaurant);
        this.restaurantName.set(restaurant.restaurantName);

        this.loadTables();
      },
    });
  }

  loadTables() {
    this.tablesService.getTables(this.idRestaurant()).subscribe({
      next: (tables) => this.tableList.set(tables),
      error: () => this.notificationService.notify('Error cargando las mesas', 'error'),
    });
  }

  updateStatus(tableId: number, status: string) {
    this.tablesService.updateStatus(tableId, status).subscribe({
      next: () => {
        this.notificationService.notify('Estado actualizado', 'success');
        this.loadTables();
      },
      error: () => {
        this.notificationService.notify('Error actualizando estado', 'error');
      },
    });
  }

  deleteTable(id: number) {}
}

import { Component, inject, signal } from '@angular/core';
import { TableService } from '../../core/services/table.service';
import { TableResponseInterface } from '../../interfaces/table';
import { NotificationService } from '../../core/services/notification.service';
import { MaterialModule } from '../../shared/ui/material-modules';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';

@Component({
  selector: 'app-tables',
  imports: [CreatePanelComponent, DynamicFormComponent, SearchBoxComponent, MaterialModule],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class TablesComponent {
  public tablesService = inject(TableService);
  private notificationService = inject(NotificationService);

  tableList = signal<TableResponseInterface[]>([]);
  restaurantName = signal<string>('Cargando...');
  displayedColumns: string[] = ['tableNumber', 'tableCapacity', 'status'];

  ngOnInit(): void {
    this.getDatosIniciales();
  }

  getDatosIniciales() {
    this.tablesService.getTables().subscribe({
      next: (data) => {
        console.log(data);
        this.tableList.set(data);
      },
      error: () => {
        this.notificationService.notify('Error cargando las mesas', 'error');
      },
    });
  }

  deleteTable(arg: any) {}
}

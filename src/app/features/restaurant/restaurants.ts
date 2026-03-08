import { Component, computed, inject, signal } from '@angular/core';
import { ScreenSizeService } from '../../core/services/screen-size';
import { MaterialModule } from '../../shared/ui/material-modules';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { RestaurantsResponseInterface } from '../../interfaces/restaurant';
import { RestaurantService } from '../../core/services/restaurant.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { DetailViewComponent } from '../../shared/components/detail-view.component/detail-view.component';
import { RESTAURANT_CREATE_FORM } from '../../forms/restaurant-create';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';

@Component({
  selector: 'app-restaurants',
  imports: [
    MaterialModule,
    SearchBoxComponent,
    DetailViewComponent,
    DynamicFormComponent,
    CreatePanelComponent,
  ],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss',
})
export class RestaurantsComponent {
  public screenSize = inject(ScreenSizeService);
  private restaurantService = inject(RestaurantService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  // Guardamos todos los restaurantes originales
  private sourceRestaurants: RestaurantsResponseInterface[] = [];

  restaurants = signal<RestaurantsResponseInterface[]>([]);
  role = signal('');
  showCreateForm = false;
  hasRestaurant = signal(true); // Default it to true to avoid flashing the form before load completes.

  restaurantFields = RESTAURANT_CREATE_FORM;

  selectedRestaurant = signal<RestaurantsResponseInterface | null>(null);
  sidenavOpen = signal(false);

  displayedColumns = computed(() =>
    this.screenSize.isMobile()
      ? ['cif', 'restaurantName', 'ownerName', 'phone', 'actions']
      : ['cif', 'restaurantName', 'ownerName', 'address', 'country', 'phone', 'actions'],
  );

  ngOnInit() {
    this.role.set(this.authService.getRole() || '');
    this.loadRestaurnts();
  }

  loadRestaurnts() {
    const currentRole = this.role();

    if (currentRole === 'ROLE_ADMIN') {
      this.restaurantService.getAllRestaurants().subscribe({
        next: (data: RestaurantsResponseInterface[]) => {
          this.sourceRestaurants = data || [];
          this.restaurants.set(this.sourceRestaurants);
        },
        error: (error) => {
          this.notificationService.notify(
            'Error no se ha podido cargar los restaurantes.',
            'error',
          );
        },
      });
    } else {
      this.restaurantService.getEmployeeRestaurant().subscribe({
        next: (data: any) => {
          if (data && !Array.isArray(data)) {
            this.sourceRestaurants = [data];
          } else if (data && Array.isArray(data)) {
            this.sourceRestaurants = data;
          } else {
            this.sourceRestaurants = [];
          }
          this.restaurants.set(this.sourceRestaurants);

          // Si es dueño y ya tiene restaurante, nos aseguramos que no se abra el form de creación.
          if (this.sourceRestaurants.length > 0) {
            this.showCreateForm = false;
            this.hasRestaurant.set(true);
          } else {
            this.hasRestaurant.set(false);
          }
        },
        error: (error) => {
          if (error.status !== 404) {
            this.notificationService.notify('Error al cargar tu restaurante.', 'error');
          }
          this.sourceRestaurants = [];
          this.restaurants.set([]);
          this.hasRestaurant.set(false);
        },
      });
    }
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.restaurants.set(this.sourceRestaurants);
      return;
    }

    const lowerFilter = filterValue.toLowerCase();
    this.restaurants.set(
      this.sourceRestaurants.filter(
        (restaurant) =>
          restaurant.restaurantName.toLowerCase().includes(lowerFilter) ||
          restaurant.ownerName.toLowerCase().includes(lowerFilter) ||
          restaurant.cif.toLowerCase().includes(lowerFilter) ||
          restaurant.address.toLowerCase().includes(lowerFilter) ||
          restaurant.phone.toString().includes(lowerFilter),
      ),
    );
  }

  openSidenav(restaurant: RestaurantsResponseInterface) {
    console.log(restaurant);
    this.selectedRestaurant.set(restaurant);
    this.sidenavOpen.set(true);
  }

  closeSidenav() {
    this.selectedRestaurant.set(null);
    this.sidenavOpen.set(false);
  }

  onCreateRestaurant(restaurantData: any) {
    // We already handled assigning owner via Auth backend if well implemented.
    // Assuming backend receives the payload and ties it to the logged in owner token
    this.restaurantService.createRestaurant(restaurantData).subscribe({
      next: (res) => {
        this.notificationService.notify('¡Restaurante creado con éxito!', 'success');
        this.showCreateForm = false;
        this.loadRestaurnts();
      },
      error: (err) => {
        console.error('Error creando restaurante', err);
        this.notificationService.notify('Error: no se ha podido crear el restaurante', 'error');
      },
    });
  }
}

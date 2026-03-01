import { Component, computed, inject, signal } from '@angular/core';
import { ScreenSizeService } from '../../core/services/screen-size';
import { MaterialModule } from '../../shared/ui/material-modules';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { RestaurantsResponseInterface } from '../../interfaces/restaurant';
import { RestaurantService } from '../../core/services/restaurant.service';
import { NotificationService } from '../../core/services/notification.service';
import { DetailViewComponent } from '../../shared/components/detail-view.component/detail-view.component';

@Component({
  selector: 'app-restaurants',
  imports: [MaterialModule, SearchBoxComponent, DetailViewComponent],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss',
})
export class RestaurantsComponent {
  public screenSize = inject(ScreenSizeService);
  private restaurantService = inject(RestaurantService);
  private notificationService = inject(NotificationService);

  // Guardamos todos los restaurantes originales
  private sourceRestaurants: RestaurantsResponseInterface[] = [];

  restaurants = signal<RestaurantsResponseInterface[]>([]);
  role = signal('');
  showCreateForm: any;

  selectedRestaurant = signal<RestaurantsResponseInterface | null>(null);
  sidenavOpen = signal(false);

  displayedColumns = computed(() =>
    this.screenSize.isMobile()
      ? ['cif', 'restaurantName', 'ownerName', 'phone', 'actions']
      : ['cif', 'restaurantName', 'ownerName', 'address', 'country', 'phone', 'actions'],
  );

  ngOnInit() {
    this.loadRestaurnts();
  }

  loadRestaurnts() {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data: RestaurantsResponseInterface[]) => {
        console.log(data);
        this.sourceRestaurants = data;
        this.restaurants.set(data);
      },
      error: (error) => {
        this.notificationService.notify('Error no se ha podido cargar los restaurantes.', 'error');
      },
    });
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
}

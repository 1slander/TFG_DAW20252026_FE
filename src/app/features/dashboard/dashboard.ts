import { ChangeDetectionStrategy, Component, inject, ViewChild, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {  SettingsMenuComponent } from "../../shared/components/settings-menu/settings-menu";
import { RouterOutlet } from '@angular/router';
import { ScreenSizeService } from '../../core/services/screen-size';
import { ThemeSelectorComponent } from "../../shared/components/theme-selector/theme-selector";
import { SideBarMenuComponent } from '../../shared/components/sidebar-menu/sidebar-menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, MatSidenavModule, SettingsMenuComponent, RouterOutlet, SideBarMenuComponent, ThemeSelectorComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidebar-sections') drawer!: MatDrawer;
  private readonly screenSizeService = inject(ScreenSizeService);
  public authService = inject(AuthService); // Injecting AuthService directly

  isMobile = this.screenSizeService.isMobile;

  onNavigate() {
    if (this.isMobile()) {
      this.drawer.close();
    }
  }

  ngOnInit() {
    // No longer parsing {area} from route. Role is handled by AuthService globally.
  }
}

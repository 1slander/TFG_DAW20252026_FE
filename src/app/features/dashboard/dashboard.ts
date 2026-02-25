import { ChangeDetectionStrategy, Component, inject, ViewChild, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SettingsMenu } from "../../shared/components/settings-menu/settings-menu";
import { RouterOutlet } from '@angular/router';
import { ScreenSize } from '../../core/services/screen-size';
import { ThemeSelector } from "../../shared/components/theme-selector/theme-selector";
import { SideBarMenu } from '../../shared/components/sidebar-menu/sidebar-menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, MatSidenavModule, SettingsMenu, RouterOutlet, SideBarMenu, ThemeSelector],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidebar-sections') drawer!: MatDrawer;
  private readonly screenSizeService = inject(ScreenSize);
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

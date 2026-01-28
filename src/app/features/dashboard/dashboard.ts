import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SettingsMenu } from "../../shared/components/settings-menu/settings-menu";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ScreenSize } from '../../core/services/screen-size';
import { ThemeSelector } from "../../shared/components/theme-selector/theme-selector";
import { SideBarMenu } from '../../shared/components/sidebar-menu/sidebar-menu';
@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, MatSidenavModule, SettingsMenu, RouterOutlet, SideBarMenu, ThemeSelector],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  @ViewChild('sidebar-sections') drawer!: MatDrawer;
  private readonly screenSizeService = inject(ScreenSize);

  area: 'admin' | 'api' = 'api';
  constructor(private route: ActivatedRoute) { }

  isMobile = this.screenSizeService.isMobile;

  onNavigate() {
    if (this.isMobile()) {
      this.drawer.close();
    }
  }

  ngOnInit() {
    this.area = this.route.snapshot.data['area'] ?? 'api';
  }
}

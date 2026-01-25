import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../ui/material-modules';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { SettingsMenu } from "../../shared/settings-menu/settings-menu";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DrawerMenu } from "../../shared/drawer-menu/drawer-menu";
import { ScreenSize } from '../../services/screen-size';
import { ThemeSelector } from "../../shared/theme-selector/theme-selector";
@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, MatSidenavModule, SettingsMenu, RouterOutlet, DrawerMenu, ThemeSelector],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  @ViewChild('drawer') drawer!: MatDrawer;
  private readonly screenSizeService = inject(ScreenSize);

  area: 'admin' | 'user' = 'user';
  constructor(private route: ActivatedRoute) {}

  isMobile = this.screenSizeService.isMobile;

  onNavigate() {
    if (this.isMobile()) {
      this.drawer.close();
    }
  }

  ngOnInit() {
    this.area = this.route.snapshot.data['area'] ?? 'user';
  }
}

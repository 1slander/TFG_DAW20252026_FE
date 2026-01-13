import { Component, inject } from '@angular/core';


import { TitleCasePipe } from '@angular/common';
import { MaterialModule } from '../../ui/material-modules';
import { ThemeManager } from '../../services/theme-manager';

@Component({
  selector: 'app-theme-selector',
  imports: [MaterialModule, TitleCasePipe],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.scss'
})
export class ThemeSelector {
  protected themeService = inject(ThemeManager);

}

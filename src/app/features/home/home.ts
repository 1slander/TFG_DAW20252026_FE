import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';


type Area = 'admin' | 'api';

@Component({
  selector: 'app-home',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Home {

  area: Area = 'api';
  base = '/api/dashboard';

  constructor(private route: ActivatedRoute) {
    // Home cuelga de /{area}/dashboard -> el data.area está en el padre (dashboard)
    this.area = (this.route.parent?.snapshot.data['area'] ?? 'api') as Area;
    this.base = `/${this.area}/dashboard`;
  }

   private allModules: Array<{
    title: string;
    description: string;
    traits: string[];
    areas: Area[];          
    route: () => string;     
  }> = [
    {
      title: 'Admins',
      description: 'This is the module for admins.',
      traits: ['charming', 'graceful', 'sassy'],
      areas: ['admin'],
      route: () => `${this.base}/admin/admins`,
    },
       {
      title: 'Users',
      description: 'This is the module for users.',
      traits: ['fluffy', 'alert', 'intelligent'],
      areas: ['api'], 
      route: () => `${this.base}/user/users`,
    },
    {
      title: 'Editors',
      description: 'This is the module for editors.',
      traits: ['charming', 'graceful', 'sassy'],
      areas: ['api', 'admin'],
      route: () => `${this.base}/editor`,
    },
    {
      title: 'Viewers',
      description: 'This is the module for viewers.',
      traits: ['fluffy', 'alert', 'intelligent'],
      areas: ['api', 'admin'],
      route: () => `${this.base}/viewer`,
    },
    {
      title: 'Cars',
      description: 'This is the module for cars.',
      traits: ['charming', 'graceful', 'sassy'],
      areas: ['api', 'admin'],
      route: () => `${this.base}/car`,
    },
    {
      title: 'Articles',
      description: 'This is the module for articles.',
      traits: ['fluffy', 'alert', 'intelligent'],
      areas: ['api', 'admin'],
      route: () => `${this.base}/article`,
    },
  ];

  get modules() {
    return this.allModules.filter(m => m.areas.includes(this.area));
  }
}

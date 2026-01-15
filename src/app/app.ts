import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'basic-angular';

  navItems = [
    { title: 'Explore the Docs', link: 'https://angular.io' },
    { title: 'Learn with Tutorials', link: 'https://angular.io/guide/architecture' },
    { title: 'CLI Docs', link: 'https://angular.io/cli' },
    { title: 'Angular Language Service', link: 'https://angular.io/guide/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.io/guide/devtools' },
    { title: 'Components & Templates', link: 'https://angular.io/guide/components-overview' },
  ];
}

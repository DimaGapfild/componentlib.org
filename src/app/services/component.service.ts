import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {ANGULARJS_COMPONENTS} from '../data/angularjs-components';
import {ANGULAR_COMPONENTS} from '../data/angular2-components';
import {REACT_COMPONENTS} from '../data/react-components';
import {VUE_COMPONENTS} from '../data/vue-components';
import {EMBER_COMPONENTS} from '../data/ember-components';

@Injectable()
export class ComponentService {

  constructor(private http: Http) {
  }

  getFrameworkFilters(): string[] {
    return ['AngularJS 1.x', 'Angular 2+', 'React', 'Vue', 'Ember'];
  }

  getAngularJSComponents(searchText?: string): any[] {
    return this.getFilterComponents(ANGULARJS_COMPONENTS, searchText);
  }

  getAngularComponents(searchText?: string): any[] {
    return this.getFilterComponents(ANGULAR_COMPONENTS, searchText);
  }

  getReactComponents(searchText?: string): any[] {
    return this.getFilterComponents(REACT_COMPONENTS, searchText);
  }

  getVueComponents(searchText?: string): any[] {
    return this.getFilterComponents(VUE_COMPONENTS, searchText);
  }

  getEmberComponents(searchText?: string): any[] {
    return this.getFilterComponents(EMBER_COMPONENTS, searchText);
  }

  private getFilterComponents(components: any[], searchText: string) {
    if (searchText) {
      components = components.filter(c => {
        return c.keywords.indexOf(searchText) > -1;
      });
    }

    components.forEach(c => {
      if (c.install.packager === 'npm') {
        c.npmUrl = 'https://www.npmjs.com/package/' + c.install.url;
      }

      if (c.source.domain === 'github') {
        c.githubUrl = 'https://github.com/' + c.source.url;
      }
    });

    return components;
  }
}

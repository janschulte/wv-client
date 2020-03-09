import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum ScreenSize {
  mobileMax = '(max-width: 768.99px)',
  tabletMax = '(max-width: 992.99px)',
}

@Injectable({
  providedIn: 'root'
})
export class LayoutValidatorService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  public isMaxObserver(screenSize: ScreenSize): Observable<boolean> {
    return this.breakpointObserver.observe([screenSize]).pipe(map(result => result.matches));
  }

  public isMax(screenSize: ScreenSize): boolean {
    return this.breakpointObserver.isMatched(screenSize);
  }

}

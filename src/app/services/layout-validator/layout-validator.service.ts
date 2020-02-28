import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutValidatorService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  public isMobileObserver(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches));
  }

  public isMobile(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

}

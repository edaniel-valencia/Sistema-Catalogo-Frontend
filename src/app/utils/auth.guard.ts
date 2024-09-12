import { CanDeactivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import {GuardService} from '../services/guard.service'
import { DashboardComponent } from '../admin/dashboard.component';

export const AuthGuard: CanDeactivateFn<DashboardComponent> = (component, currentRoute, currentState, nextState) => {
  const authGuardService = new GuardService(new Router()); 
  return authGuardService.canDeactivate();

  
};

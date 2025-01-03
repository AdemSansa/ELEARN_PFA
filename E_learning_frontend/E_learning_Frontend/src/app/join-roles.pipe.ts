import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinRoles'
})
export class JoinRolesPipe implements PipeTransform {
  transform(roles: string[]): string {
    return roles.map(role => role.replace('ROLE_', '')).join(', ');
  }
}
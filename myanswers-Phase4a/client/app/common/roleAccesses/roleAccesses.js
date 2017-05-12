import angular from 'angular';
import roleAccessesDirective from './roleAccesses.directive';

/**
 * @ngdoc directive
 * @name roleAccesses
 * @restrict A
 * @priority 101
 *
 * @param {string[]} visibleFor - array of roles, Who can see this element
 * @param {string[]} invisibleFor - array of roles, Who don't can see this element
 * @param {string[]} disableFor - array of roles, for whom element is disabled
 * @param {boolean} disableIf - additional condition for disabled
 *
 * @example
 * this button will be visible only for users with role 'user'
 * <button role-accesses visible-for="['user']">
 *   example
 * </button>
 *
 * this button will be visible for all users except for users with role 'user'
 * <button role-accesses invisible-for="['user']">
 *   example
 * </button>
 *
 * this button will be disabled only for users with role 'admin'
 * <button role-accesses disable-for="['admin']">
 *   example
 * </button>
 *
 * this button will be disabled only for users with role 'admin' and expression {{$ctrl.a == $ctrl.b}} return is true
 * <button role-accesses disable-for="['admin']" disable-if={{$ctrl.a == $ctrl.b}}>
 *   example
 * </button>
 */

let RoleAccessModule = angular.module('roleAccess', [])
  .directive('roleAccesses', roleAccessesDirective)
  .name;

export default RoleAccessModule;

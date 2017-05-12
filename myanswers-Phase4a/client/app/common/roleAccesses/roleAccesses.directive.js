class RoleAccessesDirective {
  constructor(PermPermissionStore) {
    this.restrict = 'A';
    this.transclude = true;
    this.priority = 101;

    this.PermPermissionStore = PermPermissionStore;
  }

  link($scope, $element, $attr, ctrl, $transclude) {
    let self = this;
    let childScope;

    if (!childScope) {
      $transclude(function (clone, newScope) {
        $element.append(clone);
        childScope = newScope;
      });
    }

    $scope.$watch(() => $attr.visibleFor, (visibleFor) => {
      if (!visibleFor) return;
      visibleFor = $scope.$eval(visibleFor);

      if (!self._havePermission(visibleFor)) {
        childScope.$destroy();
        childScope = null;
        $element.remove();
      }
    });

    $scope.$watch(() => $attr.invisibleFor, (invisibleFor) => {
      if (!invisibleFor) return;
      invisibleFor = $scope.$eval(invisibleFor);

      if (self._havePermission(invisibleFor)) {
        childScope.$destroy();
        childScope = null;
        $element.remove();
      }
    });

    $scope.$watchCollection(() => [$attr.disableFor, $attr.disableIf], () => {
      if (!$attr.disableFor) return;
      let disableFor = $scope.$eval($attr.disableFor);

      let check = self._havePermission(disableFor);
      if ($attr.disableIf) {
        check = check && $scope.$eval($attr.disableIf);
      }

      if (!$attr.ngDisabled || !$scope.$eval($attr.ngDisabled)) {
        $element.removeAttr('disabled');
        $element.removeClass('disabled');
      }

      if (check) {
        $element.attr('disabled', 'disabled');
        $element.addClass('disabled');
      }
    });
  }

  _havePermission(roles) {
    let isHavePermission = false;

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    roles.forEach((item) => {
      if (this.PermPermissionStore.hasPermissionDefinition(item) &&
        this.PermPermissionStore.getPermissionDefinition(item).validationFunction[2]()) {
        isHavePermission = true;
      }
    });

    return isHavePermission;
  }
}

export default (PermPermissionStore) => {
  'ngInject';
  return new RoleAccessesDirective(PermPermissionStore);
}

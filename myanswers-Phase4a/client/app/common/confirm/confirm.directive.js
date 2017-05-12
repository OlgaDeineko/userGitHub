class ConfirmDirective {
  constructor($parse, ConfirmService) {
    this.restrict = 'A';

    this.ConfirmService = ConfirmService;
    this.$parse = $parse;
  }

  link($scope, $element, $attr) {
    let self = this;
    $element.unbind("click");
    $element.bind("click", function (e) {
      self.ConfirmService.open($attr.confirm, function () {
        return self.$parse($attr.ngClick)($scope);
      });
    });
  }
}


export default ($parse, ConfirmService) => {
  'ngInject';
  return new ConfirmDirective($parse, ConfirmService);
}

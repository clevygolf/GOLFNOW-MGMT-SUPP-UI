var queryBuilder = angular.module('queryBuilder', []);
queryBuilder.directive('queryBuilder', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            group: '=',
            fields: '=',
            operators: '=',
            conditions: '='
        },
        templateUrl: '/app/views/Shared/querybuilder-directive.html',
        compile: function (element, attrs) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element, attrs) {

                scope.addCondition = function () {
                    scope.group.rules.push({
                        $type: "ManageApi.Areas.Support.Model.General.ConditionalOperand, ManageApi.Areas.Support.Model",
                        condition: '=',
                        field: scope.fields != null && scope.fields.length > 0 ? scope.fields[0] : '',
                        data: ''
                    });
                };

                scope.removeCondition = function (index) {
                    scope.group.rules.splice(index, 1);
                };

                scope.addGroup = function () {
                    scope.group.rules.push({
                        group: {
                            $type: "ManageApi.Areas.Support.Model.General.GroupOperand, ManageApi.Areas.Support.Model",
                            operator: 'AND',
                            rules: []
                        }
                    });
                };

                scope.removeGroup = function () {
                    "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                };

                directive || (directive = $compile(content));

                element.append(directive(scope, function ($compile) {
                    return $compile;
                }));
            }
        }
    }
}]);
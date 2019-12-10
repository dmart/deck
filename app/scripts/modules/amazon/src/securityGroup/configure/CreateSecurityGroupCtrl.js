'use strict';

const angular = require('angular');

import { CACHE_INITIALIZER_SERVICE, FirewallLabels } from '@spinnaker/core';

export const AMAZON_SECURITYGROUP_CONFIGURE_CREATESECURITYGROUPCTRL =
  'spinnaker.amazon.securityGroup.create.controller';
export const name = AMAZON_SECURITYGROUP_CONFIGURE_CREATESECURITYGROUPCTRL; // for backwards compatibility
angular
  .module(AMAZON_SECURITYGROUP_CONFIGURE_CREATESECURITYGROUPCTRL, [
    require('@uirouter/angularjs').default,
    CACHE_INITIALIZER_SERVICE,
  ])
  .controller('awsCreateSecurityGroupCtrl', [
    '$scope',
    '$uibModalInstance',
    '$state',
    '$controller',
    'cacheInitializer',
    'application',
    'securityGroup',
    function($scope, $uibModalInstance, $state, $controller, cacheInitializer, application, securityGroup) {
      $scope.pages = {
        location: require('./createSecurityGroupProperties.html'),
        ingress: require('./createSecurityGroupIngress.html'),
      };

      var ctrl = this;

      ctrl.translate = label => FirewallLabels.get(label);

      angular.extend(
        this,
        $controller('awsConfigSecurityGroupMixin', {
          $scope: $scope,
          $uibModalInstance: $uibModalInstance,
          application: application,
          securityGroup: securityGroup,
        }),
      );

      $scope.state.isNew = true;

      ctrl.upsert = () => ctrl.mixinUpsert('Create');

      ctrl.initializeSecurityGroups().then(ctrl.initializeAccounts);
    },
  ]);

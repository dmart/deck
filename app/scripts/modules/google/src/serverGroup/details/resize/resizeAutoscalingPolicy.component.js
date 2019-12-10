'use strict';

import _ from 'lodash';

const angular = require('angular');

export const GOOGLE_SERVERGROUP_DETAILS_RESIZE_RESIZEAUTOSCALINGPOLICY_COMPONENT =
  'spinnaker.deck.gce.serverGroup.details.resizeAutoscalingPolicy.component';
export const name = GOOGLE_SERVERGROUP_DETAILS_RESIZE_RESIZEAUTOSCALINGPOLICY_COMPONENT; // for backwards compatibility
angular
  .module(GOOGLE_SERVERGROUP_DETAILS_RESIZE_RESIZEAUTOSCALINGPOLICY_COMPONENT, [
    require('../../../autoscalingPolicy/autoscalingPolicy.write.service').name,
  ])
  .component('gceResizeAutoscalingPolicy', {
    bindings: {
      serverGroup: '=',
      command: '=',
      formMethods: '=',
      application: '=',
    },
    templateUrl: require('./resizeAutoscalingPolicy.component.html'),
    controller: [
      '$scope',
      'gceAutoscalingPolicyWriter',
      function($scope, gceAutoscalingPolicyWriter) {
        const newPolicyBounds = ['newMinNumReplicas', 'newMaxNumReplicas'];
        newPolicyBounds.forEach(prop => (this.command[prop] = null));

        angular.extend(this.formMethods, {
          formIsValid: () =>
            _.every([
              _.chain(newPolicyBounds)
                .map(bound => this.command[bound] !== null)
                .every()
                .value(),
              $scope.resizeAutoscalingPolicyForm.$valid,
            ]),
          submitMethod: () => {
            return gceAutoscalingPolicyWriter.upsertAutoscalingPolicy(
              this.application,
              this.serverGroup,
              {
                minNumReplicas: this.command.newMinNumReplicas,
                maxNumReplicas: this.command.newMaxNumReplicas,
              },
              {
                reason: this.command.reason,
                interestingHealthProviderNames: this.command.interestingHealthProviderNames,
              },
            );
          },
        });
      },
    ],
  });

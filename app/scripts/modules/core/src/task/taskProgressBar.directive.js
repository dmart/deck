'use strict';

const angular = require('angular');
import { react2angular } from 'react2angular';
import { TaskProgressBar } from './TaskProgressBar';

export const CORE_TASK_TASKPROGRESSBAR_DIRECTIVE = 'spinnaker.core.task.progressBar.directive';
export const name = CORE_TASK_TASKPROGRESSBAR_DIRECTIVE; // for backwards compatibility
angular
  .module(CORE_TASK_TASKPROGRESSBAR_DIRECTIVE, [])
  .component('taskProgressBar', react2angular(TaskProgressBar, ['task']));

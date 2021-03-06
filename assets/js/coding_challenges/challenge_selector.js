import $ from "jquery";

/**
 * Here is the starting point
 *
 * At the event triggered, the selected coding challenge is selected
 */
$(document).ready(function () {
  let currentChallenge = null;
  let lastChallenge = null;
  const tabListSelector = '#challenge_tabs';
  const boidsTabId = 'boids-tab';
  const singlePendulumTabId = 'single_pendulum-tab';
  const moverTabId = 'mover_simulation-tab';
  const hilberCurveTabId = 'hilbert_curve-tab';
  const fractalSetTabId = 'fractal_set-tab';

  $(document).on('shown.bs.tab', tabListSelector + ' a[data-toggle="tab"]', function (event) {
    const $currentTab = $(event.target);
    switch ($currentTab.attr('id')) {
      case boidsTabId:
        lastChallenge = currentChallenge;
        currentChallenge = require('./boids/boids_sketch');
        break;
      case singlePendulumTabId:
        lastChallenge = currentChallenge;
        currentChallenge = require('./single_pendulum/pendulum_sketch');
        break;
      case moverTabId:
        lastChallenge = currentChallenge;
        currentChallenge = require('./mover_simulation/sketch');
        break;
      case hilberCurveTabId:
        lastChallenge = currentChallenge;
        currentChallenge = require('./hilbert_curve/sketch');
        break;
      case fractalSetTabId:
        lastChallenge = currentChallenge;
        currentChallenge = require('./fractal_set/sketch');
        break;
      default:
        console.error('Selected Tab (' + $currentTab.attr('id') + ') does not work with any game yet.')
    }

    if (event.relatedTarget && lastChallenge) {
      lastChallenge.default.remove();
    }
  });
});
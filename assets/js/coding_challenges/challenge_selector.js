import $ from "jquery";
import Boids from "./boids/boids";

/**
 * Here is the starting point
 *
 * At the event triggered, the selected coding challenge is selected
 */
$(document).ready(function () {
  let currentChallenge = null;
  let lastChallenge = null;
  const boidsTabId = 'boids-tab';
  const tabListSelector = '#challenge_tabs';

  $(document).on('shown.bs.tab', tabListSelector + ' a[data-toggle="tab"]', function (event) {
    const $currentTab = $(event.target);
    switch ($currentTab.attr('id')) {
      case boidsTabId:
        lastChallenge = currentChallenge;
        currentChallenge = new Boids('boids-container');
        break;
      default:
        console.error('Selected Tab (' + $currentTab.attr('id') + ') does not work with any game yet.')
    }

    if(event.relatedTarget) {
      const $lastTab = $(event.relatedTarget);
      switch ($lastTab.attr('id')) {
        case boidsTabId:
          console.log('[Challenge Selector] lets CLEAR Boids Algorithm Challenge');
          break;
      }
    }
  });
});
import $ from "jquery";
import Tetris from "./tetris/tetris";

/**
 * Here is the starting point
 *
 * At the event triggered, the game is loaded
 */
$(document).ready(function () {
  let currentGame = null;
  let lastGame = null;
  const tetrisTabId = 'tetris-tab';
  const tabListSelector = '#game_tabs';

  $(document).on('shown.bs.tab', tabListSelector + ' a[data-toggle="tab"]', function (event) {
    const $currentTab = $(event.target);
    switch ($currentTab.attr('id')) {
      case tetrisTabId:
        lastGame = currentGame;
        currentGame = new Tetris('#tetris_canvas', '#next_tetroid_canvas', true);
        currentGame.initGame();
        break;
      default:
        console.error('Selected Tab (' + $currentTab.attr('id') + ') does not work with any game yet.')
    }

    if(event.relatedTarget) {
      const $lastTab = $(event.relatedTarget);
      switch ($lastTab.attr('id')) {
        case tetrisTabId:
          lastGame.clearGame();
          break;
      }
    }
  });
});
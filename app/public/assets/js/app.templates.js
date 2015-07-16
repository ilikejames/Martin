angular.module('ilj').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('areas/statements/NewGreetingController.html',
    "\n" +
    "<ilj-one-word-at-a-time-list\n" +
    "\tilj-messages=\"items\"\n" +
    "\tilj-speed=\"500\">\n" +
    "</ilj-one-word-at-a-time-list>\n" +
    "\n" +
    "\t\t\n" +
    "<audio ng-src=\"{{soundUrl}}\" ilj-audio-player autoplay></audio>\n"
  );


  $templateCache.put('common/directives/iljOneWordAtATimeList.html',
    "\n" +
    "<div ng-repeat=\"item in getItems()\">\n" +
    "\n" +
    "\t<h4 class=\"title\" ng-if=\"isString(item)\">\n" +
    "\t\t{{ item }}\n" +
    "\t</h4>\n" +
    "\n" +
    "\t<ol ng-if=\"isArray(item)\">\n" +
    "\t\t<li ng-repeat=\"subitem in item\">{{ subitem }}</li>\n" +
    "\t</ol>\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );

}]);

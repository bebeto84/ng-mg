import { configure } from '@storybook/angular';

function loadStories() {
    require('../stories/ng-loading-if.ts');
    require('../stories/ng-mg-rating.ts');
}

configure(loadStories, module);
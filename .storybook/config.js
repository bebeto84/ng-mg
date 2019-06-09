import { configure } from '@storybook/angular';

function loadStories() {
    require('../stories/ng-loading-if.ts');
}

configure(loadStories, module);
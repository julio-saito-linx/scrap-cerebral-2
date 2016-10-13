import { configure } from '@kadira/storybook';

const req = require.context('../src/components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

// function loadStories() {
//   require('../src/components/stories');
// }

configure(loadStories, module);

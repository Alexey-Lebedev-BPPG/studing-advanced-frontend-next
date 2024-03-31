const { getJestConfig } = require('@storybook/test-runner');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
};

// for test-runner.ts
// import { getStoryContext } from '@storybook/test-runner';
// import type { TestRunnerConfig } from '@storybook/test-runner';

// const config: TestRunnerConfig = {
//   /* Hook to execute after a story is rendered.
//    * The page argument is the Playwright's page object for the story
//    * The context argument is a Storybook object containing the story's id, title, and name.
//    */
//   async postRender(page, context) {
//     // Get the entire context of a story, including parameters, args, argTypes, etc.
//     const storyContext = await getStoryContext(page, context);
//     // Add your configuration here.
//   },

//   /* Hook to execute before a story is rendered.
//    * The page argument is the Playwright's page object for the story.
//    * The context argument is a Storybook object containing the story's id, title, and name.
//    */
//   async preRender(page, context) {
//     // Add your configuration here.
//   },

//   // Hook that is executed before the test runner starts running tests
//   setup() {
//     // Add your configuration here.
//   },
// };

// export default config;

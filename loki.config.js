module.exports = {
  chromeSelector: '#storybook-root > *',
  configurations: {
    'chrome.a4': {
      preset: 'A4 Paper',
      target: 'chrome.docker',
    },
    'chrome.iphone7': {
      preset: 'iPhone 7',
      target: 'chrome.docker',
    },
    'chrome.laptop': {
      height: 768,
      target: 'chrome.docker',
      width: 1366,
    },
  },
  diffingEngine: 'pixelmatch',
  fetchFailIgnore: 'localhost:1234/get',
};

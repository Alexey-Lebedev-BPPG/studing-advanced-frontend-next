module.exports = {
  plugins:
    // process.env.NODE_ENV === 'production'
    //   ? [
    [
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: { flexbox: 'no-2009' },
          features: { 'custom-properties': false },
          stage: 3,
        },
      ],
      'postcss-nested-ancestors',
      'postcss-nested',
    ],
  // : [
  //     // No transformations in development
  //   ],
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    // The output is always the same.
    return 'svgTransform'
  },
}

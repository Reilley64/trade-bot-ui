export const resolveProperty = (obj, path) => (
  path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj || {})
);

/**
 * Creates a mock user object with optional overrides.
 *
 * @param {Object} overrides - Optional overrides for the user object.
 * @param {string} overrides.name - The name of the user.
 * @returns {Object} - The mock user object.
 */
export const mockUser = (overrides) => ({
  user: {
    name: "defaultName",
    ...overrides,
  },
});

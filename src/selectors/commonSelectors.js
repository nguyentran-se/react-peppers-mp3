// auth select
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// user select
export const selectName = (state) => state.user.displayName;
export const selectFollowers = (state) => state.user.followers;
export const selectImage = (state) => state.user.image;

import { createSelector } from "reselect";
import { selectAlbums, selectPlaylists } from "./commonSelectors";

export const selectFavouriteIds = createSelector(
   [selectPlaylists, selectAlbums],
   (playlists, albums) => playlists.concat(albums).map(({ id }) => id)
);

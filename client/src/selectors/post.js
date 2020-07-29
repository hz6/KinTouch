import { createSelector } from "reselect";

const selectPost = (state) => state.post;

export const selectAllPosts = createSelector(
  [selectPost],
  (post) => post.allPosts
);

export const selectUserPosts = createSelector(
  [selectPost],
  (post) => post.userPosts
);

export const selectCurrentPost = createSelector(
  [selectPost],
  (post) => post.currentPost
);

import { createSelector } from "reselect";

const selectComment = (state) => state.comment;

export const selectCurrentComments = createSelector(
  [selectComment],
  (comment) => comment.currentComments
);
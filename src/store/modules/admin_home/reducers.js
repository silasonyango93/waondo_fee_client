import {
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  FETCHING_CLASS_LEVELS_SUCCESSFUL,
  RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
  SETUP_CLASS_LEVEL_FORM,
  TOGGLE_MODAL_DISPLAY
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [TOGGLE_MODAL_DISPLAY]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed
    }),

  [SETUP_CLASS_LEVEL_FORM]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed,
      dialogHeight: action.payload.dialogHeight,
      dialogWidth: action.payload.dialogWidth,
      modalTitle: action.payload.modalTitle,
      isAcademicClassLevelFormDisplayed:
        action.payload.isAcademicClassLevelFormDisplayed
    }),
  [FETCHING_CLASS_LEVELS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      allAcademicClassLevels: action.payload.allAcademicClassLevels
    }),
  [CLASS_LEVEL_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      isCurrentClassLevelCreated: true
    }),
  [RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED]: (state, action) =>
    Object.assign({}, state, {
      isCurrentClassLevelCreated: false
    })
};

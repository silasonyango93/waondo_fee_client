import {
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  CLASS_STREAM_CREATED_SUCCESSFULLY,
  FETCHING_CLASS_LEVELS_SUCCESSFUL,
  FETCHING_CLASS_STREAMS_SUCCESSFUL,
  RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
  RESET_CURRENT_CLASS_STREAM_CREATED,
  SETUP_CLASS_LEVEL_FORM,
  SETUP_CLASS_STREAM_FORM,
  TOGGLE_MODAL_DISPLAY
} from "./actionTypes";

export const ACTION_HANDLERS = {
  [TOGGLE_MODAL_DISPLAY]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed
    }),

  /* START - ACADEMIC CLASS LEVEL ***************************************************************************************/

  [SETUP_CLASS_LEVEL_FORM]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed,
      dialogHeight: action.payload.dialogHeight,
      dialogWidth: action.payload.dialogWidth,
      modalTitle: action.payload.modalTitle,
      isAcademicClassLevelFormDisplayed:
        action.payload.isAcademicClassLevelFormDisplayed,
      classStreams: {
        isClassStreamFormDisplayed: action.payload.isClassStreamFormDisplayed
      }
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
    }),

  /* END - ACADEMIC CLASS LEVEL ***************************************************************************************/

  /* START - CLASS STREAMS ***************************************************************************************/

  [SETUP_CLASS_STREAM_FORM]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed,
      dialogHeight: action.payload.dialogHeight,
      dialogWidth: action.payload.dialogWidth,
      modalTitle: action.payload.modalTitle,
      isAcademicClassLevelFormDisplayed:
        action.payload.isAcademicClassLevelFormDisplayed,
      classStreams: {
        isClassStreamFormDisplayed: action.payload.isClassStreamFormDisplayed
      }
    }),

  [CLASS_STREAM_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      classStreams: { isCurrentClassStreamCreated: true }
    }),
  [FETCHING_CLASS_STREAMS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      classStreams: { allClassStreams: action.payload.allClassStreams }
    }),
  [RESET_CURRENT_CLASS_STREAM_CREATED]: (state, action) =>
    Object.assign({}, state, {
      classStreams: { isCurrentClassStreamCreated: false }
    })
  /* END - CLASS STREAMS ***************************************************************************************/
};

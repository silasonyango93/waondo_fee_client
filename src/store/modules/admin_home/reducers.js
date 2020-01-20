import {
    CLASS_LEVEL_CREATED_SUCCESSFULLY,
    CLASS_STREAM_CREATED_SUCCESSFULLY,
    FETCHING_CLASS_LEVELS_SUCCESSFUL,
    FETCHING_CLASS_STREAMS_SUCCESSFUL,
    FETCHING_TERM_ITERATIONS_SUCCESSFUL,
    FETCHING_WEEK_ITERATIONS_SUCCESSFUL,
    RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
    RESET_CURRENT_CLASS_STREAM_CREATED,
    RESET_CURRENT_TERM_ITERATION_CREATED,
    RESET_CURRENT_WEEK_ITERATION_CREATED,
    SETUP_CLASS_LEVEL_FORM,
    SETUP_CLASS_STREAM_FORM,
    SETUP_TERM_ITERATIONS_FORM, SETUP_WEEK_ITERATIONS_FORM,
    TERM_ITERATION_CREATED_SUCCESSFULLY,
    TOGGLE_MODAL_DISPLAY, WEEK_ITERATION_CREATED_SUCCESSFULLY
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
      },
      termIterations: {
        isTermIterationsFormDisplayed:
          action.payload.isTermIterationsFormDisplayed
      },
        weekIterations: {
            isWeekIterationsFormDisplayed:
            action.payload.isWeekIterationsFormDisplayed
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
      },
      termIterations: {
        isTermIterationsFormDisplayed:
          action.payload.isTermIterationsFormDisplayed
      },
        weekIterations: {
            isWeekIterationsFormDisplayed:
            action.payload.isWeekIterationsFormDisplayed
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
    }),
  /* END - CLASS STREAMS ***************************************************************************************/

  /* START - TERM ITERATIONS ***************************************************************************************/
  [FETCHING_TERM_ITERATIONS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      termIterations: { allTermIterations: action.payload.allTermIterations }
    }),
  [SETUP_TERM_ITERATIONS_FORM]: (state, action) =>
    Object.assign({}, state, {
      isAdminModalDisplayed: action.payload.isAdminModalDisplayed,
      dialogHeight: action.payload.dialogHeight,
      dialogWidth: action.payload.dialogWidth,
      modalTitle: action.payload.modalTitle,
      isAcademicClassLevelFormDisplayed:
        action.payload.isAcademicClassLevelFormDisplayed,
      classStreams: {
        isClassStreamFormDisplayed: action.payload.isClassStreamFormDisplayed
      },
      termIterations: {
        isTermIterationsFormDisplayed:
          action.payload.isTermIterationsFormDisplayed
      },
        weekIterations: {
            isWeekIterationsFormDisplayed:
            action.payload.isWeekIterationsFormDisplayed
        }
    }),
  [RESET_CURRENT_TERM_ITERATION_CREATED]: (state, action) =>
    Object.assign({}, state, {
      termIterations: { isCurrentTermIterationCreated: false }
    }),
  [TERM_ITERATION_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      termIterations: { isCurrentTermIterationCreated: true }
    }),

  /* END - TERM ITERATIONS ***************************************************************************************/

  /* START - WEEK ITERATIONS ***************************************************************************************/

  [FETCHING_WEEK_ITERATIONS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      weekIterations: { allWeekIterations: action.payload.allWeekIterations }
    }),
  [RESET_CURRENT_WEEK_ITERATION_CREATED]: (state, action) =>
    Object.assign({}, state, {
      weekIterations: { isCurrentWeekIterationCreated: false }
    }),
    [SETUP_WEEK_ITERATIONS_FORM]: (state, action) =>
        Object.assign({}, state, {
            isAdminModalDisplayed: action.payload.isAdminModalDisplayed,
            dialogHeight: action.payload.dialogHeight,
            dialogWidth: action.payload.dialogWidth,
            modalTitle: action.payload.modalTitle,
            isAcademicClassLevelFormDisplayed:
            action.payload.isAcademicClassLevelFormDisplayed,
            classStreams: {
                isClassStreamFormDisplayed: action.payload.isClassStreamFormDisplayed
            },
            termIterations: {
                isTermIterationsFormDisplayed:
                action.payload.isTermIterationsFormDisplayed
            },
            weekIterations: {
                isWeekIterationsFormDisplayed:
                action.payload.isWeekIterationsFormDisplayed
            }
        }),
    [WEEK_ITERATION_CREATED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            weekIterations: { isCurrentWeekIterationCreated: true }
        }),
};

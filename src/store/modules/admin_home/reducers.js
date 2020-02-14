import {
    ACTUAL_TERM_CREATED_SUCCESSFULLY,
    ACTUAL_WEEK_CREATED_SUCCESSFULLY,
    CLASS_LEVEL_CREATED_SUCCESSFULLY,
    CLASS_STREAM_CREATED_SUCCESSFULLY,
    FETCHING_ACTUAL_TERMS_SUCCESSFUL, FETCHING_ALL_LOT_DESCRIPTIONS_SUCCESSFUL,
    FETCHING_CLASS_LEVELS_SUCCESSFUL,
    FETCHING_CLASS_STREAMS_SUCCESSFUL,
    FETCHING_TERM_ITERATIONS_SUCCESSFUL,
    FETCHING_WEEK_ITERATIONS_SUCCESSFUL,
    FETCHING_YEARS_WEEKS_SUCCESSFUL,
    RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
    RESET_CURRENT_ACTUAL_TERM_CREATED,
    RESET_CURRENT_ACTUAL_WEEK_CREATED,
    RESET_CURRENT_CLASS_STREAM_CREATED, RESET_CURRENT_LOT_DESCRIPTION_CREATED,
    RESET_CURRENT_TERM_ITERATION_CREATED,
    RESET_CURRENT_WEEK_ITERATION_CREATED,
    SETUP_ACTUAL_TERMS_FORM,
    SETUP_ACTUAL_WEEKS_FORM,
    SETUP_CLASS_LEVEL_FORM,
    SETUP_CLASS_STREAM_FORM, SETUP_LOT_DESCRIPTIONS_FORM,
    SETUP_TERM_ITERATIONS_FORM,
    SETUP_WEEK_ITERATIONS_FORM,
    TERM_ITERATION_CREATED_SUCCESSFULLY,
    TOGGLE_MODAL_DISPLAY,
    WEEK_ITERATION_CREATED_SUCCESSFULLY
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
        }
    }),
  [WEEK_ITERATION_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      weekIterations: { isCurrentWeekIterationCreated: true }
    }),

  /* END - WEEK ITERATIONS ***************************************************************************************/

  /* START - ACTUAL TERMS ***************************************************************************************/

  [FETCHING_ACTUAL_TERMS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      actualTerms: { allActualTerms: action.payload.allActualTerms }
    }),
  [SETUP_ACTUAL_TERMS_FORM]: (state, action) =>
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
        }
    }),
  [RESET_CURRENT_ACTUAL_TERM_CREATED]: (state, action) =>
    Object.assign({}, state, {
      actualTerms: { isCurrentActualTermCreated: false }
    }),
  [ACTUAL_TERM_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      actualTerms: { isCurrentActualTermCreated: true }
    }),

  /* END - ACTUAL TERMS ***************************************************************************************/

  /* START - ACTUAL WEEKS ***************************************************************************************/

  [FETCHING_YEARS_WEEKS_SUCCESSFUL]: (state, action) =>
    Object.assign({}, state, {
      actualWeeks: { allYearsWeeks: action.payload.allYearsWeeks }
    }),

  [SETUP_ACTUAL_WEEKS_FORM]: (state, action) =>
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
      },
      actualTerms: {
        isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
      },
      actualWeeks: {
        isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
      },
        lotDescriptions: {
            isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
        }
    }),
  [RESET_CURRENT_ACTUAL_WEEK_CREATED]: (state, action) =>
    Object.assign({}, state, {
      actualWeeks: { isCurrentActualWeekCreated: false }
    }),
  [ACTUAL_WEEK_CREATED_SUCCESSFULLY]: (state, action) =>
    Object.assign({}, state, {
      actualWeeks: { isCurrentActualWeekCreated: true }
    }),


    /* END - ACTUAL WEEKS ***************************************************************************************/

    /* START - LOT DESCRIPTIONS ***************************************************************************************/

    [FETCHING_ALL_LOT_DESCRIPTIONS_SUCCESSFUL]: (state, action) =>
        Object.assign({}, state, {
            lotDescriptions: { allLotDescriptions: action.payload.allLotDescriptions }
        }),

    [SETUP_LOT_DESCRIPTIONS_FORM]: (state, action) =>
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
            },
            actualTerms: {
                isActualTermsFormDisplayed: action.payload.isActualTermsFormDisplayed
            },
            actualWeeks: {
                isActualWeeksFormDisplayed: action.payload.isActualWeeksFormDisplayed
            },
            lotDescriptions: {
                isLotDescriptionsFormDisplayed: action.payload.isLotDescriptionsFormDisplayed
            }
        }),
    [RESET_CURRENT_LOT_DESCRIPTION_CREATED]: (state, action) =>
        Object.assign({}, state, {
            lotDescriptions: { isCurrentLotDescriptionCreated: false }
        })
};

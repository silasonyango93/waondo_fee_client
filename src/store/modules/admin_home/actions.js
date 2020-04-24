import {
  apiGetAll,
  apiPost
} from "../../../services/api_connector/ApiConnector";

import {
  ACTUAL_CLASS_CREATED_SUCCESSFULLY,
  ACTUAL_CLASS_CREATION_FAILED,
  ACTUAL_LOT_CREATED_SUCCESSFULLY,
  ACTUAL_LOT_CREATION_FAILED,
  ACTUAL_TERM_CREATED_SUCCESSFULLY,
  ACTUAL_TERM_CREATION_FAILED,
  ACTUAL_WEEK_CREATED_SUCCESSFULLY,
  ACTUAL_WEEK_CREATION_FAILED,
  BEGIN_ACTUAL_CLASS_CREATION,
  BEGIN_ACTUAL_LOT_CREATION,
  BEGIN_ACTUAL_TERM_CREATION,
  BEGIN_ACTUAL_WEEK_CREATION,
  BEGIN_CLASS_LEVEL_CREATION,
  BEGIN_CLASS_STREAM_CREATION,
  BEGIN_LOT_DESCRIPTION_CREATION,
  BEGIN_TERM_ITERATION_CREATION,
  BEGIN_WEEK_ITERATION_CREATION,
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  CLASS_LEVEL_CREATION_FAILED,
  CLASS_STREAM_CREATED_SUCCESSFULLY,
  CLASS_STREAM_CREATION_FAILED, ERROR_OCCURED_WHILE_ASSIGNING_USER_ROLES,
  ERROR_OCCURED_WHILE_FETCHING_ACTUAL_TERMS,
  ERROR_OCCURED_WHILE_FETCHING_ALL_ACTUAL_CLASSES,
  ERROR_OCCURED_WHILE_FETCHING_ALL_ACTUAL_LOTS,
  ERROR_OCCURED_WHILE_FETCHING_ALL_LOT_DESCRIPTIONS,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_LEVELS,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_STREAMS,
  ERROR_OCCURED_WHILE_FETCHING_TERM_ITERATIONS,
  ERROR_OCCURED_WHILE_FETCHING_WEEK_ITERATIONS,
  ERROR_OCCURED_WHILE_FETCHING_YEARS_WEEKS,
  ERROR_OCCURED_WHILE_REGISTERING_USER,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_CLASS,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_LOT,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_TERM,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_WEEK,
  ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL,
  ERROR_OCCURRED_ON_CREATING_CLASS_STREAM,
  ERROR_OCCURRED_ON_CREATING_LOT_DESCRIPTION,
  ERROR_OCCURRED_ON_CREATING_TERM_ITERATION,
  ERROR_OCCURRED_ON_CREATING_WEEK_ITERATION,
  FETCHING_ACTUAL_TERMS_EMPTY_RESULT_SET,
  FETCHING_ACTUAL_TERMS_SUCCESSFUL,
  FETCHING_ALL_ACTUAL_CLASSES_EMPTY_RESULT_SET,
  FETCHING_ALL_ACTUAL_CLASSES_SUCCESSFUL,
  FETCHING_ALL_ACTUAL_LOTS_EMPTY_RESULT_SET,
  FETCHING_ALL_ACTUAL_LOTS_SUCCESSFUL,
  FETCHING_ALL_LOT_DESCRIPTIONS_EMPTY_RESULT_SET,
  FETCHING_ALL_LOT_DESCRIPTIONS_SUCCESSFUL,
  FETCHING_CLASS_LEVELS_EMPTY_RESULT_SET,
  FETCHING_CLASS_LEVELS_SUCCESSFUL,
  FETCHING_CLASS_STREAMS_EMPTY_RESULT_SET,
  FETCHING_CLASS_STREAMS_SUCCESSFUL,
  FETCHING_TERM_ITERATIONS_EMPTY_RESULT_SET,
  FETCHING_TERM_ITERATIONS_SUCCESSFUL,
  FETCHING_WEEK_ITERATIONS_EMPTY_RESULT_SET,
  FETCHING_WEEK_ITERATIONS_SUCCESSFUL,
  FETCHING_YEARS_WEEKS_EMPTY_RESULT_SET,
  FETCHING_YEARS_WEEKS_SUCCESSFUL,
  LOT_DESCRIPTION_CREATED_SUCCESSFULLY,
  LOT_DESCRIPTION_CREATION_FAILED,
  RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
  RESET_CURRENT_ACTUAL_CLASS_CREATED,
  RESET_CURRENT_ACTUAL_LOT_CREATED,
  RESET_CURRENT_ACTUAL_TERM_CREATED,
  RESET_CURRENT_ACTUAL_WEEK_CREATED,
  RESET_CURRENT_CLASS_STREAM_CREATED,
  RESET_CURRENT_LOT_DESCRIPTION_CREATED,
  RESET_CURRENT_TERM_ITERATION_CREATED,
  RESET_CURRENT_WEEK_ITERATION_CREATED,
  SETUP_ACTUAL_CLASSES_FORM,
  SETUP_ACTUAL_LOTS_FORM,
  SETUP_ACTUAL_TERMS_FORM,
  SETUP_ACTUAL_WEEKS_FORM,
  SETUP_CLASS_LEVEL_FORM,
  SETUP_CLASS_STREAM_FORM,
  SETUP_LOT_DESCRIPTIONS_FORM,
  SETUP_TERM_ITERATIONS_FORM,
  START_FETCHING_ACTUAL_TERMS,
  START_FETCHING_ALL_ACTUAL_CLASSES,
  START_FETCHING_ALL_ACTUAL_LOTS,
  START_FETCHING_ALL_LOT_DESCRIPTIONS,
  START_FETCHING_CLASS_LEVELS,
  START_FETCHING_CLASS_STREAMS,
  START_FETCHING_TERM_ITERATIONS,
  START_FETCHING_WEEK_ITERATIONS,
  START_FETCHING_YEARS_WEEKS,
  TERM_ITERATION_CREATED_SUCCESSFULLY,
  TERM_ITERATION_CREATION_FAILED,
  TOGGLE_MODAL_DISPLAY,
  USER_REGISTRATION_FAILED, USER_ROLE_ASSIGNMENT_FAILED, USER_SUCCESSFULLY_ASSIGNED_ROLES,
  USER_SUCCESSFULLY_REGISTERED,
  WEEK_ITERATION_CREATED_SUCCESSFULLY,
  WEEK_ITERATION_CREATION_FAILED
} from "./actionTypes";
import {transactionsServicePost} from "../../../services/transactions_service_connector/TransactionsServiceConnector";

export function toggleAdminModalDisplay(isAdminModalDisplayed) {
  return async dispatch => {
    dispatch({
      type: TOGGLE_MODAL_DISPLAY,
      payload: {
        isAdminModalDisplayed: isAdminModalDisplayed
      }
    });
  };
}

/* START - ACADEMIC CLASS LEVEL ***************************************************************************************/

export function createAcademicClassLevel(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_CLASS_LEVEL_CREATION
    });
    const apiRoute = "/add_academic_class_levels";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: CLASS_LEVEL_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: CLASS_LEVEL_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL
        });
        console.log(err);
      }
    );
  };
}

export function setupClassLevelForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_CLASS_LEVEL_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: true,
        modalTitle: "Class Configurations",
        isClassStreamFormDisplayed: false,
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function fetchAlllAcademicClassLevels(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_CLASS_LEVELS
    });
    const apiRoute = "/get_all_academic_class_levels";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_CLASS_LEVELS_SUCCESSFUL,
            payload: {
              allAcademicClassLevels: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_CLASS_LEVELS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_CLASS_LEVELS
        });
        console.log(err);
      }
    );
  };
}

export function resetCurrentAcademicClassLevelCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED
    });
  };
}

/* END - ACADEMIC CLASS LEVEL ***************************************************************************************/

/* START - CLASS STREAMS ***************************************************************************************/
export function createClassStreams(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_CLASS_STREAM_CREATION
    });
    const apiRoute = "/add_class_streams";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: CLASS_STREAM_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: CLASS_STREAM_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_CLASS_STREAM
        });
        console.log(err);
      }
    );
  };
}

export function fetchAllClassStreams(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_CLASS_STREAMS
    });
    const apiRoute = "/get_all_class_streams";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_CLASS_STREAMS_SUCCESSFUL,
            payload: {
              allClassStreams: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_CLASS_STREAMS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_CLASS_STREAMS
        });
        console.log(err);
      }
    );
  };
}

export function resetCurrentClassStreamCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_CLASS_STREAM_CREATED
    });
  };
}

export function setupClassStreamForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_CLASS_STREAM_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: true,
        modalTitle: "Class Configurations",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}
/* END - CLASS STREAMS *****************************************************************************************/

/* START - TERM ITERATIONS ***************************************************************************************/

export function fetchAllTermIterations() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_TERM_ITERATIONS
    });
    const apiRoute = "/get_all_term_iterations";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_TERM_ITERATIONS_SUCCESSFUL,
            payload: {
              allTermIterations: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_TERM_ITERATIONS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_TERM_ITERATIONS
        });
        console.log(err);
      }
    );
  };
}

export function setupTermIterationsForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_TERM_ITERATIONS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Calender",
        isTermIterationsFormDisplayed: true,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentTermIterationCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_TERM_ITERATION_CREATED
    });
  };
}

export function createTermIterations(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_TERM_ITERATION_CREATION
    });
    const apiRoute = "/add_term_iterations";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: TERM_ITERATION_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: TERM_ITERATION_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_TERM_ITERATION
        });
        console.log(err);
      }
    );
  };
}

/* END - TERM ITERATIONS *****************************************************************************************/

/* START - WEEK ITERATIONS ***************************************************************************************/

export function fetchAllWeekIterations() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_WEEK_ITERATIONS
    });
    const apiRoute = "/get_all_week_iterations";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_WEEK_ITERATIONS_SUCCESSFUL,
            payload: {
              allWeekIterations: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_WEEK_ITERATIONS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_WEEK_ITERATIONS
        });
        console.log(err);
      }
    );
  };
}

export function setupWeekIterationsForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_TERM_ITERATIONS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Calender",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: true,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentWeekIterationCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_WEEK_ITERATION_CREATED
    });
  };
}

export function createWeekIterations(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_WEEK_ITERATION_CREATION
    });
    const apiRoute = "/add_week_iterations";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: WEEK_ITERATION_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: WEEK_ITERATION_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_WEEK_ITERATION
        });
        console.log(err);
      }
    );
  };
}

/* END - WEEK ITERATIONS *****************************************************************************************/

/* START - ACTUAL TERMS ***************************************************************************************/

export function fetchAllActualTerms(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_ACTUAL_TERMS
    });
    const apiRoute = "/get_all_current_year_terms";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_ACTUAL_TERMS_SUCCESSFUL,
            payload: {
              allActualTerms: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_ACTUAL_TERMS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_ACTUAL_TERMS
        });
        console.log(err);
      }
    );
  };
}

export function setupActualTermsForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_ACTUAL_TERMS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Calender",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: true,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentActualTermCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACTUAL_TERM_CREATED
    });
  };
}

export function createActualTerm(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_ACTUAL_TERM_CREATION
    });
    const apiRoute = "/add_term";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: ACTUAL_TERM_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: ACTUAL_TERM_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_ACTUAL_TERM
        });
        console.log(err);
      }
    );
  };
}

/* END - ACTUAL TERMS *****************************************************************************************/

/* START - ACTUAL WEEKS *****************************************************************************************/

export function fetchAyearsActualWeeks(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_YEARS_WEEKS
    });
    const apiRoute = "/get_a_years_weeks";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_YEARS_WEEKS_SUCCESSFUL,
            payload: {
              allYearsWeeks: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_YEARS_WEEKS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_YEARS_WEEKS
        });
        console.log(err);
      }
    );
  };
}

export function setupActualWeeksForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_ACTUAL_WEEKS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Calender",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: true,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentActualWeekCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACTUAL_WEEK_CREATED
    });
  };
}

export function createActualWeek(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_ACTUAL_WEEK_CREATION
    });
    const apiRoute = "/add_actual_weeks";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: ACTUAL_WEEK_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: ACTUAL_WEEK_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_ACTUAL_WEEK
        });
        console.log(err);
      }
    );
  };
}

/* END - ACTUAL WEEKS *****************************************************************************************/

/* START - LOT DESCRIPTIONS *****************************************************************************************/

export function fetchAllLotDescriptions() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_ALL_LOT_DESCRIPTIONS
    });
    const apiRoute = "/get_all_lot_descriptions";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_ALL_LOT_DESCRIPTIONS_SUCCESSFUL,
            payload: {
              allLotDescriptions: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_ALL_LOT_DESCRIPTIONS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_ALL_LOT_DESCRIPTIONS
        });
        console.log(err);
      }
    );
  };
}

export function setupLotDescriptionsForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_LOT_DESCRIPTIONS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Class Configuration",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: true,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentLotDescriptionCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_LOT_DESCRIPTION_CREATED
    });
  };
}

export function createLotDescription(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_LOT_DESCRIPTION_CREATION
    });
    const apiRoute = "/add_lot_descriptions";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: LOT_DESCRIPTION_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: LOT_DESCRIPTION_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_LOT_DESCRIPTION
        });
        console.log(err);
      }
    );
  };
}

/* END - LOT DESCRIPTIONS *****************************************************************************************/

/* START - ACTUAL LOTS *****************************************************************************************/

export function fetchAllActualLots() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_ALL_ACTUAL_LOTS
    });
    const apiRoute = "/get_all_lots_by_full_description";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_ALL_ACTUAL_LOTS_SUCCESSFUL,
            payload: {
              allActualLots: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_ALL_ACTUAL_LOTS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_ALL_ACTUAL_LOTS
        });
        console.log(err);
      }
    );
  };
}

export function setupActualLotsForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_ACTUAL_LOTS_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Class Configuration",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: true,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}

export function resetCurrentActualLotCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACTUAL_LOT_CREATED
    });
  };
}

export function createActualLot(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_ACTUAL_LOT_CREATION
    });
    const apiRoute = "/add_lots";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: ACTUAL_LOT_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: ACTUAL_LOT_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_ACTUAL_LOT
        });
        console.log(err);
      }
    );
  };
}

/* END - ACTUAL LOTS *****************************************************************************************/

/* START - ACTUAL CLASSES *****************************************************************************************/

export function fetchAllActualClasses() {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_ALL_ACTUAL_CLASSES
    });
    const apiRoute = "/get_all_actual_classes_by_full_description";
    const returnedPromise = apiGetAll(apiRoute);
    returnedPromise.then(
        function(result) {
          if (result.data.results && result.data.results.length > 0) {
            dispatch({
              type: FETCHING_ALL_ACTUAL_CLASSES_SUCCESSFUL,
              payload: {
                allActualClasses: result.data.results
              }
            });
          } else if (result.data.results && result.data.results.length === 0) {
            dispatch({
              type: FETCHING_ALL_ACTUAL_CLASSES_EMPTY_RESULT_SET
            });
          }
        },
        function(err) {
          dispatch({
            type: ERROR_OCCURED_WHILE_FETCHING_ALL_ACTUAL_CLASSES
          });
          console.log(err);
        }
    );
  };
}



export function setupActualClassesForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_ACTUAL_CLASSES_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "Class Configuration",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: true,
        isUserRegistrationFormDisplayed: false
      }
    });
  };
}


export function resetCurrentActualClassCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACTUAL_CLASS_CREATED
    });
  };
}


export function createActualClass(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_ACTUAL_CLASS_CREATION
    });
    const apiRoute = "/add_class";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
        function(result) {
          if (result.data.results.success) {
            dispatch({
              type: ACTUAL_CLASS_CREATED_SUCCESSFULLY
            });
          } else {
            dispatch({
              type: ACTUAL_CLASS_CREATION_FAILED
            });
          }
        },
        function(err) {
          dispatch({
            type: ERROR_OCCURRED_ON_CREATING_ACTUAL_CLASS
          });
          console.log(err);
        }
    );
  };
}



/* END - ACTUAL CLASSES *****************************************************************************************/

/* START - SYSTEM_USER_REGISTRATION *****************************************************************************************/


export function setupSystemUserRegistrationForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_ACTUAL_CLASSES_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "450",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: false,
        modalTitle: "System User Registration",
        isTermIterationsFormDisplayed: false,
        isWeekIterationsFormDisplayed: false,
        isActualTermsFormDisplayed: false,
        isActualWeeksFormDisplayed: false,
        isLotDescriptionsFormDisplayed: false,
        isActualLotsFormDisplayed: false,
        isActualClassesFormDisplayed: false,
        isUserRegistrationFormDisplayed: true
      }
    });
  };
}


export function registerAUser(payload) {
  return async dispatch => {
    const apiRoute = "/users/create_user";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
        function(result) {
          if (result.data.userSuccessfullyCreated) {
            dispatch({
              type: USER_SUCCESSFULLY_REGISTERED
            });

          } else {
            dispatch({
              type: USER_REGISTRATION_FAILED
            });
          }
        },
        function(err) {
          dispatch({
            type: ERROR_OCCURED_WHILE_REGISTERING_USER
          });
          console.log(err);
        }
    );
  };
}



export function assignAUserRoles(payload) {
  return async dispatch => {
    const apiRoute = "/user_roles/assign_a_user_roles";
    const returnedPromise = transactionsServicePost(payload, apiRoute);
    returnedPromise.then(
        function(result) {
          // if (result.data.results.success) {
          //   dispatch({
          //     type: USER_SUCCESSFULLY_ASSIGNED_ROLES,
          //     payload: {
          //       userId: result.data.results.recordId
          //     }
          //   });
          //   console.log(result.data.results);
          // } else {
          //   dispatch({
          //     type: USER_ROLE_ASSIGNMENT_FAILED
          //   });
          // }
          console.log(result);
        },
        function(err) {
          dispatch({
            type: ERROR_OCCURED_WHILE_ASSIGNING_USER_ROLES
          });
          console.log(err);
        }
    );
  };
}

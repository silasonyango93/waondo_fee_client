import {
  apiGetAll,
  apiPost
} from "../../../services/api_connector/ApiConnector";

import {
  ACTUAL_TERM_CREATED_SUCCESSFULLY,
  ACTUAL_TERM_CREATION_FAILED,
  ACTUAL_WEEK_CREATED_SUCCESSFULLY,
  ACTUAL_WEEK_CREATION_FAILED,
  BEGIN_ACTUAL_TERM_CREATION,
  BEGIN_ACTUAL_WEEK_CREATION,
  BEGIN_CLASS_LEVEL_CREATION,
  BEGIN_CLASS_STREAM_CREATION,
  BEGIN_TERM_ITERATION_CREATION,
  BEGIN_WEEK_ITERATION_CREATION,
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  CLASS_LEVEL_CREATION_FAILED,
  CLASS_STREAM_CREATED_SUCCESSFULLY,
  CLASS_STREAM_CREATION_FAILED,
  ERROR_OCCURED_WHILE_FETCHING_ACTUAL_TERMS,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_LEVELS,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_STREAMS,
  ERROR_OCCURED_WHILE_FETCHING_TERM_ITERATIONS,
  ERROR_OCCURED_WHILE_FETCHING_WEEK_ITERATIONS,
  ERROR_OCCURED_WHILE_FETCHING_YEARS_WEEKS,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_TERM,
  ERROR_OCCURRED_ON_CREATING_ACTUAL_WEEK,
  ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL,
  ERROR_OCCURRED_ON_CREATING_CLASS_STREAM,
  ERROR_OCCURRED_ON_CREATING_TERM_ITERATION,
  ERROR_OCCURRED_ON_CREATING_WEEK_ITERATION,
  FETCHING_ACTUAL_TERMS_EMPTY_RESULT_SET,
  FETCHING_ACTUAL_TERMS_SUCCESSFUL,
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
  RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
  RESET_CURRENT_ACTUAL_TERM_CREATED,
  RESET_CURRENT_ACTUAL_WEEK_CREATED,
  RESET_CURRENT_CLASS_STREAM_CREATED,
  RESET_CURRENT_TERM_ITERATION_CREATED,
  RESET_CURRENT_WEEK_ITERATION_CREATED,
  SETUP_ACTUAL_TERMS_FORM,
  SETUP_ACTUAL_WEEKS_FORM,
  SETUP_CLASS_LEVEL_FORM,
  SETUP_CLASS_STREAM_FORM,
  SETUP_TERM_ITERATIONS_FORM,
  START_FETCHING_ACTUAL_TERMS,
  START_FETCHING_CLASS_LEVELS,
  START_FETCHING_CLASS_STREAMS,
  START_FETCHING_TERM_ITERATIONS,
  START_FETCHING_WEEK_ITERATIONS,
  START_FETCHING_YEARS_WEEKS,
  TERM_ITERATION_CREATED_SUCCESSFULLY,
  TERM_ITERATION_CREATION_FAILED,
  TOGGLE_MODAL_DISPLAY,
  WEEK_ITERATION_CREATED_SUCCESSFULLY,
  WEEK_ITERATION_CREATION_FAILED
} from "./actionTypes";

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
        isActualWeeksFormDisplayed: false
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
        isActualWeeksFormDisplayed: false
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
        isActualWeeksFormDisplayed: false
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
        isActualWeeksFormDisplayed: false
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
        isActualWeeksFormDisplayed: false
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
        isActualWeeksFormDisplayed: true
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

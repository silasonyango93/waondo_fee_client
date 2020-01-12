import { apiPost } from "../../../services/api_connector/ApiConnector";

import {
  BEGIN_CLASS_LEVEL_CREATION,
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  CLASS_LEVEL_CREATION_FAILED,
  ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL,
  SETUP_CLASS_LEVEL_FORM,
  TOGGLE_MODAL_DISPLAY
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
        modalTitle: "Class Configurations"
      }
    });
  };
}

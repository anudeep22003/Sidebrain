import React from 'react'

let dropDownAlert;

function setDropDownAlert(ref) {
  dropDownAlert = ref;
}

function alert(type, title, message) {
  dropDownAlert.alertWithType(type, title, message, {source: ''}, 1000);
}

export default {
  dropDownAlert,
  alert,
  setDropDownAlert,
};

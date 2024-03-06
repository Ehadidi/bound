export function remove_item(array, item) {
  const ind = array.indexOf(item);
  array.splice(ind, 1);
}

export function return_valid(InputName, feedback, _wrong, t) {
  if (feedback) {
    feedback.classList.add("valid");
    feedback.innerHTML = `<span>${t(
      `validate_msg.${InputName}${_wrong}`
    )}</span>`;
  }
}

export function empty_valid(feedback) {
  if (feedback) {
    feedback.classList.remove("valid");
    feedback.innerHTML = "";
  }
}

export function validate(form, t) {
  if (form) {
    let ErrorValids = [];
    //============== check radio group data ==============>
    let radioGroups = form.querySelectorAll(".radio_group");
    if (radioGroups) {
      for (let G = 0; G < radioGroups.length; G++) {
        let groupItem = radioGroups[G];
        let InputsRadio = groupItem.querySelectorAll(".radio_valid");
        for (let R = 0; R < InputsRadio.length; R++) {
          let input_radio = InputsRadio[R];
          let radio_feed = input_radio
            .closest(".radio_group")
            .getElementsByClassName("feedback")[0];
          if (input_radio.checked) {
            if (ErrorValids.includes(input_radio.name)) {
              remove_item(ErrorValids, input_radio.name);
            }
            empty_valid(radio_feed);
            break;
          } else {
            ErrorValids.push(input_radio.name);
            return_valid(input_radio.name, radio_feed, "", t);
          }
        }
      }
    }
    //============== check checkbox group data ==============>
    let checkGroups = form.querySelectorAll(".check_group");
    if (checkGroups) {
      for (let G = 0; G < checkGroups.length; G++) {
        let groupItem = checkGroups[G];
        // let dataName = groupItem
        let InputsCheck = groupItem.querySelectorAll(".check_valid");
        for (let R = 0; R < InputsCheck.length; R++) {
          let input_check = InputsCheck[R];
          let check_feed = input_check
            .closest(".check_group")
            .getElementsByClassName("feedback")[0];
          if (!check_feed) {
            check_feed = document.createElement("div");
            check_feed.classList.add("feedback");
            input_check.closest(".check_group").appendChild(check_feed);
          }
          if (input_check.checked) {
            if (ErrorValids.includes(input_check.name)) {
              remove_item(ErrorValids, input_check.name);
            }
            empty_valid(check_feed);
            break;
          } else {
            ErrorValids.push(input_check.name);
            return_valid(input_check.name, check_feed, "", t);
          }
        }
      }
    }
    //============== get arrays data ==============>
    let FormArray = form.querySelectorAll(".validated");
    for (let i = 0; i < FormArray.length; i++) {
      //============== get form data ==============>
      let Input = FormArray[i];
      let value = Input.value;
      let feedback =
        Input.parentElement.parentElement.getElementsByClassName("feedback")[0];
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.classList.add("feedback");
        Input.parentElement.parentElement.appendChild(feedback);
      }
      let type = Input.type;
      //============== inputs check ==============>
      if (value == "") {
        if (Input.parentElement.classList.contains("p-calendar")) {
          let FeedBack =
            Input.closest(".form__label").getElementsByClassName("feedback")[0];
          let InputName = Input.closest(".p-calendar").getAttribute("name");
          ErrorValids.push(InputName);
          return_valid(InputName, FeedBack, "", t);
        } else {
          ErrorValids.push(Input.name);
          return_valid(Input.name, feedback, "", t);
        }
      } else if (value != "") {
        //============== email check ==============>
        if (type == "email") {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            empty_valid(feedback);
            if (ErrorValids.includes(Input.name)) {
              remove_item(ErrorValids, Input.name);
            }
          } else {
            ErrorValids.push(Input.name);
            return_valid(Input.name, feedback, "_wrong", t);
          }
        }
        //============== phone check ==============>
        else if (type === "number" && Input.name === "phone") {
          if (
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
              value
            )
          ) {
            empty_valid(feedback);
            if (ErrorValids.includes(Input.name)) {
              remove_item(ErrorValids, Input.name);
            }
          } else {
            ErrorValids.push(Input.name);
            return_valid(Input.name, feedback, "_wrong", t);
          }
        }
        //============== password check ==============>
        else if (type === "password" || Input.name === "password" || Input.name === "password_confirmation") {
          let Input_password = form.querySelectorAll('[name="password"]')[0];
          //============== check length password ==============>
          if (Input.name === "password") {
            if (value.length < 6 || value.length > 100) {
              ErrorValids.push(Input.name);
              return_valid(Input.name, feedback, "_wrong", t);
            } else {
              empty_valid(feedback);
              if (ErrorValids.includes(Input.name)) {
                remove_item(ErrorValids, Input.name);
              }
            }
          }
          //============== check confirm password ==============>
          if (Input.name === "password_confirmation") {
            if (Input.value === Input_password.value) {
              empty_valid(feedback);
              if (ErrorValids.includes(Input.name)) {
                remove_item(ErrorValids, Input.name);
              }
            } else {
              ErrorValids.push(Input.name);
              return_valid(Input.name, feedback, "_wrong", t);
            }
          }
        }
        //============== feedback if input not empty ==============>
        else {
          if (Input.parentElement.classList.contains("p-calendar")) {
            let FeedBack =
              Input.closest(".form__label").getElementsByClassName(
                "feedback"
              )[0];
            let InputName = Input.closest(".p-calendar").getAttribute("name");
            empty_valid(FeedBack);
            if (ErrorValids.includes(InputName)) {
              remove_item(ErrorValids, InputName);
            }
          } else {
            empty_valid(feedback);
            if (ErrorValids.includes(Input.name)) {
              remove_item(ErrorValids, Input.name);
            }
          }
        }
      }
    }
    //============== final feedback ==============>
    if (ErrorValids.length) {
      return { valid: "notValid" };
    } else {
      return { valid: "isValid" };
    }
  }
}

export function change_valid(e, t) {
  let Input = e.target;
  let type = Input.type;
  let value = Input.value;
  let InputName = Input.name;
  //============== file check ==============>
  if (type === "file") {
    let feedback = Input.parentElement.getElementsByClassName("feedback")[0];
    if (!value) {
      return_valid(InputName, feedback, "", t);
    } else {
      empty_valid(feedback);
    }
  }
  //============== radio check ==============>
  else if (type === "radio") {
    let radio_feedback =
      Input.closest(".radio_group").getElementsByClassName("feedback")[0];
    if (Input.checked) {
      empty_valid(radio_feedback);
    } else {
      return_valid(InputName, radio_feedback, "", t);
    }
  }
  //============== checkbox check ==============>
  else if (type === "checkbox") {
    let checked = [];
    let parent = Input.closest(".check_group");
    let seblig_check = parent.querySelectorAll('input[type="checkbox"]');
    let check_feedback =
      Input.closest(".check_group").getElementsByClassName("feedback")[0];
    for (let C = 0; C < seblig_check.length; C++) {
      let seblig = seblig_check[C];
      if (seblig.checked) {
        checked.push(seblig);
      } else {
        if (checked.includes(seblig)) {
          remove_item(checked, seblig);
        }
      }
      if (checked.length) {
        empty_valid(check_feedback);
      } else {
        return_valid(InputName, check_feedback, "", t);
      }
    }
  }
  //============== all inputs check ==============>
  else {
    let feedback =
      Input.parentElement.parentElement.getElementsByClassName("feedback")[0];
    if (value === "") {
      if (!Input.parentElement.classList.contains("p-calendar")) {
        return_valid(InputName, feedback, "", t);
      } else {
        let FeedBack =
          Input.closest(".form__label").getElementsByClassName("feedback")[0];
        let InputName = Input.closest(".p-calendar").getAttribute("name");
        return_valid(InputName, FeedBack, "", t);
      }
    } else if (value != "") {
      //============== email check ==============>
      if (type == "email") {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          empty_valid(feedback);
        } else {
          return_valid(InputName, feedback, "_wrong", t);
        }
      }
      //============== phone check ==============>
      else if (type === "number" && InputName === "phone") {
        if (
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
        ) {
          empty_valid(feedback);
        } else {
          return_valid(InputName, feedback, "_wrong", t);
        }
      }
      //============== password check ==============>
      else if (type === "password") {
        let Input_password = document.querySelectorAll('[name="password"]')[0];
        //============== check length password ==============>
        if (InputName === "password") {
          if (value.length < 6 || value.length > 100) {
            return_valid(InputName, feedback, "_wrong", t);
          } else {
            empty_valid(feedback);
          }
        }
        //============== check confirm password ==============>
        if (InputName === "password_confirmation") {
          if (value === Input_password.value) {
            empty_valid(feedback);
          } else {
            return_valid(InputName, feedback, "_wrong", t);
          }
        }
      }
      //============== feedback if input not empty ==============>
      else {
        if (!Input.parentElement.classList.contains("p-calendar")) {
          empty_valid(feedback);
        } else {
          let FeedBack =
            Input.closest(".form__label").getElementsByClassName("feedback")[0];
          empty_valid(FeedBack);
        }
      }
    }
  }
}

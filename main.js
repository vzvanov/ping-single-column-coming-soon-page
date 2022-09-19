const form = document.querySelector('form');
const email = document.querySelector('.email');
const btn = document.querySelector('.btn');
let msg = undefined;

form.onsubmit = (e) => {
  e.preventDefault();
  // Constraint validation API
  let validationMessage = email.validationMessage || 'Please provide a valid email';
  let isValid = email.validity.valid && email.value.length !== 0;
  showMessage(isValid, validationMessage);
}

email.onfocus = () => {
  removeMessage();
}

const showMessage = (isValid, text) => {
  if (msg) return;
  if (!isValid) {
    msg = getMessage(text);
    if (isInlineElement(email)) {
      btn.after(msg);
    } else {
      email.after(msg);
    }
    email.classList.add("error");
  }
}

const getMessage = (text) => {
  let element = document.createElement('div');
  element.classList.add("msg");
  element.classList.add("msg__appear");
  element.innerHTML = text;
  return element;
}

const removeMessage = () => {
  if (!msg) return;
  email.classList.remove("error");
  msg.classList.remove("msg__appear");
  msg.classList.add("msg__fade");
  setTimeout(function () {
    msg.remove();
    msg = undefined;
  }, 500);
}

const isInlineElement = (element) => {
  let display = window.getComputedStyle(email).display;
  return display.includes('inline');
}

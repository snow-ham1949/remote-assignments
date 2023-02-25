const validateName = (name) => {
  const regex = /^[A-Za-z0-9]*$/;
  return regex.test(name);
};

const validateEmail = (email) => { 
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  let numUppercase = (password.match(/[A-Z]/g) || []).length;
  let numLowercase = (password.match(/[a-z]/g) || []).length;
  let numDigit = (password.match(/[0-9]/g) || []).length;
  let numSymbol = (password.match(/[~`!@#$%^&*()_+={[}\]|:;"'<,>.?/]/g) || []).length;

  let typeCheck = 0;
  if (numUppercase !== 0) typeCheck++;
  if (numLowercase !== 0) typeCheck++;
  if (numDigit !== 0) typeCheck++;
  if (numSymbol !== 0) typeCheck++;

  if (typeCheck >= 3) return true;
  else return false;
};

module.exports = {validateName, validateEmail, validatePassword};
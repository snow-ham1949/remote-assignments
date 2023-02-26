const validateInput = (name, email, password) => {
  if (checkName(name) && checkEmail(email) && checkPassword(password)) return true;
  return false;
};

const checkName = (name) => {
  return /^[A-Za-z0-9]*$/.test(name);
}

const checkEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const checkPassword = (password) => {
  let numUppercase = (password.match(/[A-Z]/g) || []).length;
  let numLowercase = (password.match(/[a-z]/g) || []).length;
  let numDigit = (password.match(/[0-9]/g) || []).length;
  let numSpecial = (password.match(/[~`!@#$%^&*()_-+={[}\]|:;"'<,>.?/]/g) || []).length;

  let type = 0;
  if (numUppercase > 0) type++;
  if (numLowercase > 0) type++;
  if (numDigit > 0) type++;
  if (numSpecial > 0) type++;

  if (type >= 3) return true;
  return false;
};

const checkRequestDate = (date) => {
  const dateFormat_RFC1123 = /^((Mon|Tue|Wed|Thu|Fri|Sat|Sun), [0-9]{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT)$/;
  const dateFormat_RFC1036 = /^((Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day, [0-9]{2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT)$/;
  const dateFormat_ANSIC = /^((Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) *[0-9]{1,2} [0-9]{1,2}:[0-9]{2}:[0-9]{2} [0-9]{4})$/;
  return dateFormat_RFC1123.test(date) || dateFormat_RFC1036.test(date) || dateFormat_ANSIC.test(date);
};

module.exports = {validateInput, checkRequestDate};
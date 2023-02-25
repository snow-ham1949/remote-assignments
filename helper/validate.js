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

/**
 * - check format of user sign up API
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 */
const checkInputFormat = (name, email, password) => {
  if (validateName(name) && validateEmail(email) && validatePassword(password)) return true;
  else return false;
};

/**
 * - check if date string meets one of these three:
 * -  Sun, 06 Nov 1994 08:49:37 GMT  ; RFC 822, updated by RFC 1123
      Sunday, 06-Nov-94 08:49:37 GMT ; RFC 850, obsoleted by RFC 1036
      Sun Nov  6 08:49:37 1994       ; ANSI C's asctime() format
 * @param {string} date
 * @return {boolean} 
 */
const validateDateFormat = function (date) {
  const dateFormat_RFC1123 = /^((Mon|Tue|Wed|Thu|Fri|Sat|Sun), [0-9]{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT)$/;
  const dateFormat_RFC1036 = /^((Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day, [0-9]{2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT)$/;
  const dateFormat_ANSIC = /^((Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) *[0-9]{1,2} [0-9]{1,2}:[0-9]{2}:[0-9]{2} [0-9]{4})$/;
  return dateFormat_RFC1123.test(date) || dateFormat_RFC1036.test(date) || dateFormat_ANSIC.test(date);
}

module.exports = {validateDateFormat, checkInputFormat};
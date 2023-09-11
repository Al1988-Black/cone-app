export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }
      case "isOnlyDigit": {
        const digitOnlyRegExp = /^\d+$/g;
        statusValidate = !digitOnlyRegExp.test(data);
        break;
      }
      case "isOnlyNumbersGreaterThan0": {
        const digitOnlyRegExp = /^([1-9]|[1-9]\d+)$/g;
        statusValidate = !digitOnlyRegExp.test(data);
        break;
      }
      case "isOnlyNumbersGreaterThan3": {
        const digitNumbersGreaterThan3 = /^([3-9]|[1-9]\d+)$/g;
        statusValidate = !digitNumbersGreaterThan3.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}

const requiredRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => !!value || message;
};

const requiredListRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => (!!value && value.key !== '') || message;
};

const requiredSelectorRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => {
    return !!value?.key || message;
  };
};

const requiredRuleConditional = (
  message: string,
  condition: boolean
): ((value: any) => boolean | string) => {
  if (!condition) {
    return value => !!value || message;
  } else {
    return _value => true;
  }
};

const requiredRuleConditionalList = (
  message: string,
  condition: boolean
): ((value: any) => boolean | string) => {
  if (!condition) {
    return value => (!!value && value !== '') || message;
  } else {
    return _value => true;
  }
};

const alphanumericRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => /^[a-zA-ZÀ-ÿ-\\d\\s\\.-_ ]*$/.test(value) || message;
};

const numericRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => /^[0-9]*$/.test(value) || message;
};

const sizeLimitRule = (
  message: string,
  limit: number
): ((value: any) => boolean | string) => {
  return value => (value.length >= 0 && value.length <= limit) || message;
};

const atLeastSizeRule = (
  message: string,
  size: number
): ((value: any) => boolean | string) => {
  return value => (value && value.length >= size) || message;
};

const latitudeRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => (value && value >= -90 && value <= 90) || message;
};

const longitudeRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => (value && value >= -180 && value <= 180) || message;
};

const identificationNumberRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value =>
    /^(\d{8})([A-Z])$/.test(value) ||
    /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(value) ||
    /^[XYZ]\d{7,8}[A-Z]$/.test(value) ||
    message;
};

const emailRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || message;
};

const phoneNumberRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value =>
    (value && value >= 100000000) ||
    (value && value >= 999999999) ||
    !value ||
    message;
};

const postalCodeRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => (value && value >= 0 && value <= 99999) || message;
};

const minioBucketNameRegexRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => {
    const regex =
      /^(?!xn--)(?!.*\.\.)(?!.*\.-|\..*-)[a-z0-9.-]{3,63}(?<!-s3alias)$/;
    return regex.test(value) || message;
  };
};

const validateFileSizeRule = (
  maxSize: number,
  message: string
): ((value: any) => boolean | string) => {
  return value =>
    !value || !value.length || value[0].size <= maxSize || message;
}

const requiredFileRule = (
  message: string
): ((value: any) => boolean | string) => {
  return value => !!value || message;
}


export const kaiztenFormRules = {
  requiredRule,
  requiredListRule,
  requiredSelectorRule,
  requiredRuleConditional,
  requiredRuleConditionalList,
  alphanumericRule,
  numericRule,
  sizeLimitRule,
  atLeastSizeRule,
  latitudeRule,
  longitudeRule,
  identificationNumberRule,
  emailRule,
  phoneNumberRule,
  postalCodeRule,
  minioBucketNameRegexRule,
  validateFileSizeRule,
  requiredFileRule
}
const UError = require('../../errors');

function currencyConvertParse(json) {
  try {
    json = json['util:CurrencyConversionRsp'][0]['util:CurrencyConversion'].map((curr) => ({
      from: curr.$.From,
      to: curr.$.To,
      rate: curr.$.BankSellingRate,
    }));
  } catch (e) {
    throw new UError('PARSING_ERROR', json);
  }

  return json;
}

const errorHandler = (err) => {
  let errno = 0;
  try {
    errno = err['SOAP:Fault'][0].detail[0]['common_v34_0:ErrorInfo'][0]['common_v34_0:Code'][0];
  } catch (e) {
    console.log('cant parse error');
  }

  switch (errno * 1) {
    default:
      throw new UError('UNHANDLED_ERROR', err);
  }
};

module.exports = {
  UTILS_ERROR: errorHandler,
  CURRENCY_CONVERSION: currencyConvertParse,
};

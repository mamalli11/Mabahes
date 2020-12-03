const newPrdValid = {
  Name: {
    type: "string",
    trim: true,
    min: 3,
    max: 50,
    optional: false,
    messages: {
      required: "نام الزامی می باشد",
      stringMin: "نام نباید کمتر از 3 کاراکتر باشد",
      stringMax: "نام نباید بیشتر از 50 کاراکتر باشد",
    },
  },
  Description: {
    type: "string",
    min: 3,
    max: 100,
    messages: {
      required: "فیلد توضیحات نباید خالی باشد",
      stringMin: "توضیحات نباید کمتر از 3 کاراکتر باشد",
      stringMax: "توضیحات نباید بیشتر از 100 کاراکتر باشد",
      string: "توضیحات را بررسی کنید",
    },
  },
  Price: {
    type: "string",
    min: 0,
    max: 30,
    messages: {
      required: "فیلد مبلغ نباید خالی باشد",
      stringMin: "مبلغ نباید کمتر از 3 کاراکتر باشد",
      stringMax: "مبلغ نباید بیشتر از 30 کاراکتر باشد",
      string: "مبلغ را بررسی کنید",
    },
  },
  Weight: {
    type: "string",
    min: 3,
    max: 50,
    messages: {
      required: "وزن الزامی می باشد",
      string: "وزن را بررسی کنید",
      stringMin: "وزن نباید کمتر از 3 کاراکتر باشد",
      stringMax: "وزن نمی تواند بیشتر از 50 کاراکتر باشد",
    },
  },
  $$strict: true,
};

module.exports = newPrdValid;

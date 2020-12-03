const regiSchema = {
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
  Phone: {
    type: "string",
    min: 10,
    max: 12,
    messages: {
      required: "فیلد تلفن نباید خالی باشد",
      stringMin: "تلفن نباید کمتر از 10 کاراکتر باشد",
      stringMax: "تلفن نباید بیشتر از 12 کاراکتر باشد",
      string: "تلفن را بررسی کنید",
    },
  },
  Email: {
    type: "email",
    normalize: true,
    messages: {
      emailEmpty: "فیلد ایمیل نباید خالی باشد",
      required: "ایمیل الزامی می باشد",
      string: "آدرس ایمیل را بررسی کنید",
    },
  },
  Address: {
    type: "string",
    min: 4,
    max: 200,
    messages: {
      required: "آدرس الزامی می باشد",
      string: "آدرس را بررسی کنید",
      stringMin: "آدرس نباید کمتر از 4 کاراکتر باشد",
      stringMax: "آدرس نمی تواند بیشتر از 200 کاراکتر باشد",
    },
  },
  Password: {
    type: "string",
    min: 4,
    max: 255,
    messages: {
      required: "کلمه عبور الزامی می باشد",
      string: "کلمه عبور را بررسی کنید",
      stringMin: "کلمه عبور نباید کمتر از 4 کاراکتر باشد",
      stringMax: "کلمه عبور نمی تواند بیشتر از 255 کاراکتر باشد",
    },
  },
  $$strict: true,
};

module.exports = regiSchema;
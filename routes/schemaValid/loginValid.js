const loginSchema = {
  Email: {
    type: "email",
    normalize: true,
    messages: {
      emailEmpty: "فیلد ایمیل نباید خالی باشد",
      required: "ایمیل الزامی می باشد",
      string: "آدرس ایمیل را بررسی کنید",
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

module.exports = loginSchema;

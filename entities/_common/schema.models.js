export const schema = {
  id: {
    path: "id",
    type: String,
    length: { min: 1, max: 50 },
  },
  username: {
    path: "username",
    type: String,
    length: { min: 3, max: 20 },
    custom: "username",
  },
  password: {
    path: "password",
    type: String,
    length: { min: 8, max: 100 },
  },
  email: {
    path: "email",
    type: String,
    length: { min: 3, max: 100 },
  },
  title: {
    path: "title",
    type: String,
    length: { min: 3, max: 300 },
  },
  label: {
    path: "label",
    type: String,
    length: { min: 3, max: 100 },
  },
  shortDesc: {
    path: "desc",
    type: String,
    length: { min: 3, max: 300 },
  },
  longDesc: {
    path: "desc",
    type: String,
    length: { min: 3, max: 2000 },
  },
  url: {
    path: "url",
    type: String,
    length: { min: 9, max: 300 },
  },
  price: {
    path: "price",
    type: Number,
  },
  avatar: {
    path: "avatar",
    type: String,
    length: { min: 8, max: 100 },
  },
  text: {
    type: String,
    length: { min: 3, max: 15 },
  },
  longText: {
    type: String,
    length: { min: 3, max: 250 },
  },
  paragraph: {
    type: String,
    length: { min: 3, max: 10000 },
  },
  phone: {
    type: String,
    length: 13,
  },
  email: {
    type: String,
    regex:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  number: {
    type: Number,
    length: { min: 1, max: 6 },
  },
  arrayOfStrings: {
    type: Array,
    items: {
      type: String,
      length: { min: 3, max: 100 },
    },
  },
  obj: {
    type: Object,
  },
  bool: {
    type: Boolean,
  },
};

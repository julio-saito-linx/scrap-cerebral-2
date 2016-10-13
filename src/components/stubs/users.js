import _ from 'lodash';

export const user_stub = {
  accessToken: "EAAH9HiYlvGQBAOw68dr1ZBHDsk7g0eGl0SPcAcA803OyWxIPasrNaOv7pQa9F6rU36g9IlGzZAkJ47dwVkseOXuozHTNp1SiJJwO7ZBoOgsuJQwkfJMr81K2NUukZA23zGKoZBS2HiLv9GStLZBuAYNaYxd56iACEZD",
  displayName: "Julio Makdisse Saito",
  email: "saitodisse@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/12508976_10153759880406390_8416104502837857399_n.jpg?oh=432996373a465b9ed2528ac02a831af6&oe=586DCB72",
  providerData: [],
  uid: "fIDeGx7O8MhqDkTjGMgoZEl2t1d2"
};

export const users_stub = {
  'user_1': _.merge({}, user_stub, {
    uid: 'user_1',
    photoURL: 'https://robohash.org/user_1',
    displayName: 'Roberto Marinha'
  }),
  'user_2': _.merge({}, user_stub, {
    uid: 'user_2',
    photoURL: 'https://robohash.org/user_2',
    displayName: 'Plablo Henrique'
  }),
  'user_3': _.merge({}, user_stub, {
    uid: 'user_3',
    photoURL: 'https://robohash.org/user_3',
    displayName: 'John Smith'
  }),
};

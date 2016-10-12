import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DisplayMyName from '../DisplayMyName/edit';
import Home from '../Home';
import Users from '../Users';
import UserItem from '../Users/UserItem';
import UserDetail from '../UserDetail';

storiesOf('DisplayMyName', module)
  .add('empty', () => (
    <DisplayMyName />
  ))
  .add('Julio', () => (
    <DisplayMyName my_name="Julio"/>
  ))
;

storiesOf('Home', module)
  .add('initial', () => (
    <Home />
  ))
;

const user_stub = {
  accessToken: "EAAH9HiYlvGQBAOw68dr1ZBHDsk7g0eGl0SPcAcA803OyWxIPasrNaOv7pQa9F6rU36g9IlGzZAkJ47dwVkseOXuozHTNp1SiJJwO7ZBoOgsuJQwkfJMr81K2NUukZA23zGKoZBS2HiLv9GStLZBuAYNaYxd56iACEZD",
  displayName: "Julio Makdisse Saito",
  email: "saitodisse@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/12508976_10153759880406390_8416104502837857399_n.jpg?oh=432996373a465b9ed2528ac02a831af6&oe=586DCB72",
  providerData: [],
  uid: "fIDeGx7O8MhqDkTjGMgoZEl2t1d2"
};

storiesOf('Users', module)
  .add('is_loading === true', () => (
    <Users is_loading={true} />
  ))
  .add('is_loading === false', () => (
    <Users is_loading={false} users_list={[]} />
  ))
;

storiesOf('UserItem', module)
  .add('Julio', () => (
    <UserItem user={user_stub}/>
  ))
;

storiesOf('UserDetail', module)
  .add('Julio', () => (
    <UserDetail selected_user={user_stub}/>
  ))
;

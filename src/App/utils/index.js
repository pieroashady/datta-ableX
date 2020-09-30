import Parse from 'parse';

export const checkUser = () => {
  const user = Parse.User.current();

  if (user) {
    console.log('Ada user');
    console.log(user);
    return true;
  }

  return false;
};

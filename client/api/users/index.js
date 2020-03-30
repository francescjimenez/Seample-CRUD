import ApiService from "../apiService";

const getUsers = (id = null) => {
  const url = (id) ? 'users/' + id : 'users';
  return ApiService.get(url);
};

const submitUsers = (user) => {
  if(user._id){
    return ApiService.patch(`users/${user._id}`, user);
  }else{
    return ApiService.post('users', user);
  }
};

const deleteUsers = (id) => {
  return ApiService.remove('users', id);
};


const ApiUsers = {
  getUsers,
  submitUsers,
  deleteUsers
};

export default ApiUsers;
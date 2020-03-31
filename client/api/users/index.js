import ApiService from "../apiService";

const getUsers = (id = null) => {
  const url = (id) ? 'users/' + id : 'users';
  return ApiService.get(url);
};

const submitUsers = (user) => (user._id) ? ApiService.patch(`users/${user._id}`, user) : ApiService.post('users', user);

const deleteUsers = (id) => ApiService.remove('users', id);

const ApiUsers = {
  getUsers,
  submitUsers,
  deleteUsers
};

export default ApiUsers;
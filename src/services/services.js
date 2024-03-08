import axios from "axios";

export const getUser = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    return data;
  } catch (error) {
    return error;
  }
};

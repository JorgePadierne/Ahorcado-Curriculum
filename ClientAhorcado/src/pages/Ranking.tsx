import { useState, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
function Ranking() {
  const api = useAxios();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/api/juego/puntuaciones");
      console.log(data);
      setUsers(data);
    };

    fetchUsers();
  }, [api]);

  return (
    <>
      {users.map((user, index) => (
        <div key={index}>
          <h2>{user}</h2>
        </div>
      ))}
    </>
  );
}

export default Ranking;

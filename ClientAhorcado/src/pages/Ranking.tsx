import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

type UserRank = {
  id: number;
  name: string;
  puntuacion: number;
};
function Ranking() {
  const api = useAxios();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/api/juego/puntuaciones");
      setUsers(data);
    };

    fetchUsers();
  }, [api]);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
          🏆 Ranking
        </h1>
        <div className="space-y-4">
          {users.map((user: UserRank, index: number) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg 
          ${
            index === 0
              ? "bg-yellow-100"
              : index === 1
              ? "bg-gray-200"
              : index === 2
              ? "bg-orange-100"
              : "bg-white"
          }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-700 w-8 text-center">
                  #{index + 1}
                </span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>
              </div>
              <h3 className="text-lg font-bold text-indigo-700">
                {user.puntuacion} pts
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ranking;

import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

type UserRank = {
  id: number;
  name: string;
  puntuacion: number;
};
function Ranking() {
  const api = useAxios();
  const [users, setUsers] = useState<UserRank[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get<UserRank[]>("/api/juego/puntuaciones");
      const rankingOrdenado = data
        .slice()
        .sort((a, b) => b.puntuacion - a.puntuacion);
      setUsers(rankingOrdenado);
    };

    fetchUsers();
  }, [api]);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600">
          🏆 Ranking
        </h1>

        <div className="space-y-4">
          {users.map((user, index: number) => {
            // Colores y medallas
            const colors =
              index === 0
                ? "from-yellow-100 to-yellow-50 border-yellow-300"
                : index === 1
                ? "from-gray-100 to-gray-50 border-gray-300"
                : index === 2
                ? "from-orange-100 to-orange-50 border-orange-300"
                : "from-white to-gray-50 border-gray-200";

            const medal =
              index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-5 rounded-2xl shadow-md border bg-gradient-to-r ${colors} 
            transition transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl w-8 text-center">
                    {medal || `#${index + 1}`}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>
                </div>
                <h3 className="text-lg font-bold text-indigo-700">
                  {user.puntuacion} pts
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Ranking;

import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
function Ranking() {
  const api = useAxios();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/api/juego/puntuaciones");
      console.log(data);
    };

    fetchUsers();
  }, [api]);

  return <></>;
}

export default Ranking;

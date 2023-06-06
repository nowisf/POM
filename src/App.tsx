import { useRef } from "react";
import "./app.css";

import Dialog from "./componentes/Dialog";
import { Mapa } from "./Map";

function App() {
  const dialogRef = useRef(null);

  const abrirDialog = () => {
    if (dialogRef.current) {
      //
    }
  };
  // const [cosas, setCosas] = useState<Cosas[]>([]);

  // useEffect(() => {
  //   setCosas((prev) => [...prev, { x: 1, y: 1, color: "#FF9B55" }]);
  // }, []);

  return (
    <>
      <Mapa />
    </>
  );
}

export default App;

import AppRoutes from "./routes";
import { GlobalStyle } from "./styles/global";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalStyle />
      <AppRoutes />
    </>
  );
};

export default App;

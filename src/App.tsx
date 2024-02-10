import { MainLuckyNumber } from "./pages";
import { MainLuckyNumberProvider } from "./providers";

function App() {
  return (
    <MainLuckyNumberProvider>
      <MainLuckyNumber />
    </MainLuckyNumberProvider>
  );
}

export default App;

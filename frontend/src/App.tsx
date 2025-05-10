import Layout from "./components/Layout/Layout";
import Header from "./features/Header/Header";
import ListWrap from "./components/ListWrap/ListWrap";
import { CountArea } from "./components/CountArea/CountArea";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <ListWrap />
      </Layout>
      <CountArea />
    </>
  );
};

export default App;

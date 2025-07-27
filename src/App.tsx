import Main from './components/Main';
import DegasTable from './components/Degas/Table';
import Header from './components/Header';
import ChamberTable from './components/Chamber/Table';
import ExportCard from './components/ExportCard';

function App() {
  return (
    <>
      <Header />
      <Main className="gap-4 ">
        <div className="flex gap-4">
          <ChamberTable />
          <div className="flex flex-col gap-4">
            <ExportCard />
            <DegasTable />
          </div>
        </div>
      </Main>
    </>
  );
}

export default App;

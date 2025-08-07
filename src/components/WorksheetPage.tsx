import ChamberTable from './Chamber/Table';
import DegasTable from './Degas/Table';
import ExportCard from './ExportCard';
import Main from './Main';

const WorkSheetPage = () => {
  return (
    <Main className="gap-4 ">
      <div className="flex gap-4">
        <ChamberTable />

        <div className="flex flex-col gap-4">
          <ExportCard />
          <DegasTable />
        </div>
      </div>
    </Main>
  );
};

export default WorkSheetPage;

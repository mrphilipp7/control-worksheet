import { Card, CardAction, CardHeader, CardTitle } from './ui/card';
import { PrinterIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useShiftStore } from '@/store/shift';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useDegasStore } from '@/store/degas';
import { useChamberStore } from '@/store/chamber';

const ExportCard = () => {
  const degasRows = useDegasStore((state) => state.degasRows);
  const chamberRows = useChamberStore((state) => state.chamberRows);

  const { isShiftNight, setIsShiftNight } = useShiftStore();

  function handleShiftChange() {
    setIsShiftNight(!isShiftNight);
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Control Room Worksheet</CardTitle>
        <CardAction className="flex justify-between gap-4  w-58">
          <div className="flex items-center space-x-2">
            <Switch id="shift-change" onCheckedChange={handleShiftChange} />
            <Label htmlFor="shift-change">
              {isShiftNight === true ? 'Night' : 'Day'} Shift
            </Label>
          </div>

          <Button
            onClick={() => {
              const formData = { chamber: chamberRows, degas: degasRows };
              console.log(formData); //api call here
            }}
          >
            <PrinterIcon />
            Export
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default ExportCard;

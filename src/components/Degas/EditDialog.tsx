import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';
import type { Degas } from '@/types';
import { useDegasStore } from '@/store/degas';

const DegasEditDialog = ({
  row,
  onClose,
}: {
  row: Degas;
  onClose: () => void;
}) => {
  const degasRows = useDegasStore((state) => state.degasRows);
  const setDegasRows = useDegasStore((state) => state.setDegasRows);

  const [formData, setFormData] = useState({
    status: row.Status,
    roomNum: row.Room,
    controlNum: row.ControlNumber,
    timeFinished: row.TimeFinished,
    loadSize: row.LoadSize,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    onClose();
    try {
      const updatedRow: Degas = {
        ID: row.ID,
        ControlNumber: formData.controlNum,
        LoadSize: formData.loadSize,
        Room: formData.roomNum,
        Shift: row.Shift,
        Status: formData.status,
        TimeFinished: formData.timeFinished,
      };

      const updatedRows = degasRows.map((row) =>
        row.ID === updatedRow.ID ? updatedRow : row
      );

      setDegasRows(updatedRows);
      // make api call
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('error:', err.message);
      } else {
        console.log('error:', err);
      }
    }
  }

  return (
    <Dialog open={!!row} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit row entry</DialogTitle>
            <DialogDescription>
              Make changes to your here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status.toString()}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger className="w-full" id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Idle</SelectItem>
                    <SelectItem value="1">Running</SelectItem>
                    <SelectItem value="2">Finished</SelectItem>
                    <SelectItem value="3">Down</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room-num">Room #</Label>
              <Input
                id="room-num"
                value={formData.roomNum}
                onChange={(e) => handleChange('roomNum', e.target.value)}
                placeholder="eg. (1-21)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="control-num">Control number</Label>
              <Input
                id="control-num"
                value={formData.controlNum}
                onChange={(e) => handleChange('controlNum', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time-finished"> Time finished</Label>
              <Input
                id="time-finished"
                value={formData.timeFinished}
                onChange={(e) => handleChange('timeFinished', e.target.value)}
                placeholder="yyyy-mm-dd"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="load-size">Load size</Label>
              <Input
                id="load-size"
                value={formData.loadSize}
                onChange={(e) => handleChange('loadSize', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DegasEditDialog;

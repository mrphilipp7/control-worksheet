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

const DegasAddDialog = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const setDegasRows = useDegasStore((state) => state.setDegasRows);
  const degasRows = useDegasStore((state) => state.degasRows);

  const [formData, setFormData] = useState({
    status: '',
    roomNum: '',
    controlNum: '',
    timeFinished: '',
    loadSize: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onClose();
    try {
      const newRow: Degas = {
        ControlNumber: Number(formData.controlNum),
        ID: Number(`${Date.now()}-${Math.floor(Math.random() * 1000)}`),
        LoadSize: Number(formData.loadSize),
        Room: Number(formData.roomNum),
        Shift: false, // figure out later
        Status: Number(formData.status) as 0 | 1 | 2 | 3,
        TimeFinished: formData.timeFinished,
      };
      setDegasRows([...degasRows, newRow]);
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add row entry</DialogTitle>
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

export default DegasAddDialog;

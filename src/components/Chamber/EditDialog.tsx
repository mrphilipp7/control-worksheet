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
import type { Chamber } from '@/types';
import { useChamberStore } from '@/store/chamber';

const ChamberEditDialog = ({
  row,
  onClose,
}: {
  row: Chamber;
  onClose: () => void;
}) => {
  const chamberRows = useChamberStore((state) => state.chamberRows);
  const setChamberRows = useChamberStore((state) => state.setChamberRows);

  const [formData, setFormData] = useState({
    status: row.Status,
    product: row.Product,
    uploadTime: row.UploadTime,
    degasRoom: row.DegasRoom,
    reloadTime: row.ReloadTime,
    pcRoom: row.PCRoom,
    finishTime: row.FinishTime,
    startTime: row.StartTime,
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
      const updatedRow: Chamber = {
        Chamber: row.Chamber,
        DegasRoom: formData.degasRoom,
        FinishTime: formData.finishTime,
        ID: row.ID,
        PCRoom: formData.pcRoom,
        Product: formData.product,
        ReloadTime: formData.reloadTime,
        Shift: row.Shift,
        StartTime: formData.startTime,
        Status: Number(formData.status) as 0 | 1 | 2 | 3,
        UploadTime: formData.uploadTime,
      };

      console.log(updatedRow);

      const updatedRows = chamberRows.map((row) =>
        row.ID === updatedRow.ID ? updatedRow : row
      );

      setChamberRows(updatedRows);
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
              <Label htmlFor="room-num">Product</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleChange('product', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upload-time">Upload time</Label>
              <Input
                id="upload-time"
                value={formData.uploadTime}
                onChange={(e) => handleChange('uploadTime', e.target.value)}
                placeholder="yyyy-mm-dd"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degas-room"> Degas room</Label>
              <Input
                id="degas-room"
                value={formData.degasRoom}
                onChange={(e) => handleChange('degasRoom', e.target.value)}
                placeholder="ed. (1-21)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reload-time">Reload time</Label>
              <Input
                id="reload-time"
                value={formData.reloadTime}
                onChange={(e) => handleChange('reloadTime', e.target.value)}
                placeholder="yyyy-mm-dd"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pc-room">PC room</Label>
              <Input
                id="pc-room"
                value={formData.pcRoom}
                onChange={(e) => handleChange('pcRoom', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="finish-time">Finish time</Label>
              <Input
                id="finish-time"
                value={formData.finishTime}
                onChange={(e) => handleChange('finishTime', e.target.value)}
                placeholder="yyyy-mm-dd"
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

export default ChamberEditDialog;

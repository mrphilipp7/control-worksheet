export interface Degas {
  ControlNumber: number;
  ID: number;
  LoadSize: number;
  Room: number;
  Shift: boolean;
  Status: 0 | 1 | 2 | 3;
  TimeFinished: string;
}

export interface Chamber {
  Chamber: number;
  DegasRoom: string;
  FinishTime: string;
  ID: number;
  PCRoom: string;
  Product: string;
  ReloadTime: string;
  Shift: boolean;
  StartTime: string;
  Status: 0 | 1 | 2 | 3;
  UploadTime: string;
}

import { BaseMasterModel } from "../../masters.models";



export class ProjectDataRemoveModel extends BaseMasterModel {
  id: number;
  projectId: number;
  isArchieve: boolean;
  isApplicationBackup: boolean;
  isDatabaseBackup: boolean;
  isDelete: boolean;
  companyId: number;
  studyCode: string;
  isDocumentArchieve: boolean;
  status: number;
  backupDate?: Date;
  archieveDate?: Date;
  removeDate?: Date;
  base64: string;
  extension: string;
  reasonId: number;
  reasonOth: string
}

export class ProjectDataRemoveList extends BaseMasterModel {
  id: number;
  projectId: number;
  isArchieve: boolean;
  isApplicationBackup: boolean;
  isDatabaseBackup: boolean;
  isDelete: boolean;
  companyId: number;
  studyCode: string;
  isDocumentArchieve: boolean;
  companyName: string;
  statusName: string;
  backupDate?: Date;
  archieveDate?: Date;
  removeDate?: Date;
  backupBy: string;
  archieveBy: string;
  removeBy: string;
  base64: string;
  extension: string;
  reasonName: string;
  reasonOth: string;
  path:any;
}


export class AuditTrailModel {
  moduleId?: number;
  tableId?: number;
  pageName: string;
  recordId?: number;
  parentRecordId?: number;
  action?: number;
  columnName?: string;
  labelName?: string;
  oldValue?: string;
  newValue?: string;
  reasonId?: number;
  reasonOth?: string;
  isRecordDeleted?: boolean;
  userId?: number;
  userRoleId?: number;
  moduleName?: string;
  tableName?: string;
  actionName?: string;
  reasonName?: string;
  userName?: string;
  userRoleName?: string;
  isOther?: boolean;
  createdDate?: Date;
  askReason?: boolean;
  ipAddress?: string;
  timeZone?: string;
}

export class AuditTrailCommonModel {
  tableName: string;
  pageName: string;
  recordId?: number;
  action?: string;
  columnName?: string;
  oldValue?: string;
  newValue?: string;
  reasonId?: number;
  reasonOth?: string;
  userId?: number;
  userRoleId?: number;
  reasonName?: string;
  userName?: string;
  userRoleName?: string;
  createdDate?: Date;
  ipAddress?: string;
  timeZone?: string;
}

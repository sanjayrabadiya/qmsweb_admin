import { Messages } from './messages';

export class Constant {
  static readonly message = Messages;
  static readonly gridPageSize = 9;
  static readonly auditColumns = ['CreateDate', 'CreatedBy', 'ModifiedDate', 'ModifiedBy'];
  static readonly auditColumnsprime = [
    { field: 'createdDate', header: 'Created Date', type: 'date' },
    { field: 'createdName', header: 'Created By' },
    { field: 'modifiedDate', header: 'Modified Date', type: 'date' },
    { field: 'modifiedName', header: 'Modified By' }
  ];

  static readonly AuditModules = {
    Volunteer: 1,
    Common: 2,
    Attendance: 3,
    Configuration: 4,
    UserManagement: 5,
    StudySetUp: 6,
    Screening: 7,
    DesignLibrary: 8,
    Master: 9,
    Barcode: 10,
    Report: 11,
    Etmf : 12,
    MedicalCoding : 13,
    InformConsent : 14
  };

  static readonly DataType = {
    String: 1,
    Number: 2,
    Date: 3,
    Boolean: 4
  };
  static readonly ServerType={
    OnPremise:1,
    Oncloud:2
  }
}

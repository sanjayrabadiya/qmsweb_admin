import { BaseMasterModel } from './../masters.models';
export class ZoneModel extends BaseMasterModel {
    id?: number;
    zoneName: string;
    applicationPath: string;
    documentPath: string;
    archievePath: string;
    apiUrl: string;
    studyRemoveUploadDoc: string;
    studyRemoveDownloadDocUrl: string
}

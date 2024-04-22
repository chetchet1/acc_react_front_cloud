export type CurrentAssetType = {
    accountCode: string;
    accoutName: string;
    assetCode: string;
    assetName: string;
    progress: string;
    finalizeStatus: string;
  };
  

export type CurrentAssetColumnType = {
    width?: number | string;
    headerName: string;
    field: string;
    editable?: boolean;
    type?: string;
    valueOptions?: string[];
    key?: string;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    hide?: boolean;
  };
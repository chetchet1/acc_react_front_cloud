
export type baseColumnsProps = {
        id: string;
        label: string;
        minWidth?: Number;
        align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
        format?: (value: Date | number) => string | boolean;
}

export type HeadCell = {
    id: string;
    numeric: boolean;
    label: string;
    disablePadding?: string | boolean | undefined;
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  };

export type CreateDataType = {
    accountInnerCode: string;
    accountName: number | string;
  };
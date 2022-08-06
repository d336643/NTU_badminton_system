import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomToolbarGrid() {
    const columns = [
        { id: 'name', label: '姓名', minWidth: 120 },
        { id: 'depart', label: '系級', minWidth: 100 },
        { id: 'code', label: '匯款後五碼', minWidth: 150 },
        { id: 'check', label: '已繳費', minWidth: 80 },
    ];
    
    function createData(name, depart, code, check) {
        return { name, depart, code, check };
    }
    
    const rows = [
        createData('India', 'IN', 1324171354),
        createData('China', 'CN', 1403500365),
        createData('Italy', 'IT', 60483973),
        createData('United States', 'US', 327167434),
        createData('Canada', 'CA', 37602103),
        createData('Australia', 'AU', 25475400),
        createData('Germany', 'DE', 83019200),
        createData('Ireland', 'IE', 4857000),
        createData('Mexico', 'MX', 126577691),
        createData('Japan', 'JP', 126317000),
        createData('France', 'FR', 67022000),
        createData('United Kingdom', 'GB', 67545757),
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </div>
    );
}

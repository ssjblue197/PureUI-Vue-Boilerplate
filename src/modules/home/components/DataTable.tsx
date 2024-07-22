import { useEffect, useState, useMemo } from 'react';
import {
  AgGridReact,
  CustomCellRendererProps,
} from '@ag-grid-community/react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import {
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import type {
  History,
  FilterParams,
} from '@/features/dashboard/types';
import { useDashboardStore } from '@/features/dashboard/store';
import { moneyFormat } from '@/utils/helper';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

export interface IDataTableProps {
  filter?: FilterParams;
  refresh?: string;
}

// Row Data Interface
interface IRow extends History {}

/* Custom Cell Renderer (Display tick / cross in 'Successful' column) */
const StatusRender = (params: CustomCellRendererProps) => (
  <span
    className={twMerge(
      'px-2 py-1 rounded border text-xs font-medium',
      String(params.value).toLowerCase() == 'paid'
        ? 'text-green-500 border-green-500 bg-green-500/10'
        : 'text-gray-400 border-gray-400 bg-gray-400/10',
    )}
  >
    {params.value}
  </span>
);

export default function DataTable(props: IDataTableProps) {
  const { t } = useTranslation();

  const defaultColDef = useMemo(
    () => ({
      filter: true, // Enable filtering on all columns
    }),
    [],
  );
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    {
      field: 'fromId',
      headerName: t('table.fromId'),
      width: 140,
      cellClass: 'font-semibold text-sky-600',
      resizable: false,
      filter: false,
    },
    {
      field: 'inDate',
      headerName: t('table.date'),
      valueFormatter: (params: ValueFormatterParams) =>
        params.value,
      width: 160,
      cellClass: 'text-gray-600',
      resizable: false,
      filter: false,
    },
    {
      field: 'action',
      headerName: t('table.action'),
      width: 120,
      cellClass: 'font-medium',
      resizable: false,
      filter: false,
    },
    {
      field: 'message',
      headerName: t('table.message'),

      flex: 1,
      cellClass: 'text-gray-600',
      minWidth: 150,
      resizable: false,
      filter: false,
    },
    {
      field: 'toId',
      headerName: t('table.toId'),
      width: 180,
      cellClass: 'font-semibold text-sky-600',
      resizable: false,
      filter: false,
    },
    {
      field: 'value',
      headerName: t('table.value'),
      valueFormatter: (params: ValueFormatterParams) =>
        moneyFormat(params.value),
      cellClass: 'font-medium text-green-500',
      width: 150,
      resizable: false,
      filter: false,
    },
    {
      field: 'status',
      headerName: t('table.status'),
      cellRenderer: StatusRender,
      width: 120,
      resizable: false,
      filter: false,
    },
  ]);
  const dashboardStore = useDashboardStore();

  const [loading, setLoading] = useState(false);
  console.warn(loading);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const { data } = await dashboardStore.history(
        props.filter,
      );
      setRowData(data ?? []);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadHistory();
  }, [props.refresh]);

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: '100%', minHeight: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true}
        localeText={{
          noRowsToShow: t('table.noRowsToShow'),
          more: t('table.more'),
          to: t('table.to'),
          of: t('table.of'),
          page: t('table.page'),
        }}
      />
    </div>
  );
}

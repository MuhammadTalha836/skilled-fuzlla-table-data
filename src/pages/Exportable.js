import React, { useState, useEffect, } from 'react'
import { collection, getDocs, } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here


export default function Exportable() {
    const [getData, setGetData] = useState([])

    const fetchDocuments = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(firestore, "admissionForms"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });

        setGetData(array)

        console.log(array)

    }
    useEffect(() => {
        fetchDocuments();
    }, [])


    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 40,
        },
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            size: 120,
        },
        {
            accessorKey: 'fatherName',
            header: 'Father Name',
            size: 120,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 120,
        },
        {
            accessorKey: 'phone',
            header: 'Phone Number',
        },
        {
            accessorKey: 'whatsapp',
            header: 'Whatsapp Number',
        },
        {
            accessorKey: 'dob',
            header: 'Date of Birth',
        },



    ];


    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);


    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
    };

    const handleExportData = () => {
        csvExporter.generateCsv(getData);
    };

    return (
        <div className="container">

            <MaterialReactTable
                columns={columns}
                data={getData}
                enableRowSelection
                positionToolbarAlertBanner="bottom"
                renderTopToolbarCustomActions={({ table }) => (
                    <Box
                        sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                    >
                        <Button
                            color="primary"
                            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                            onClick={handleExportData}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                        >
                            Export All Data
                        </Button>
                        <Button
                            disabled={table.getPrePaginationRowModel().rows.length === 0}
                            //export all rows, including from the next page, (still respects filtering and sorting)
                            onClick={() =>
                                handleExportRows(table.getPrePaginationRowModel().rows)
                            }
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                        >
                            Export All Rows
                        </Button>
                        <Button
                            disabled={table.getRowModel().rows.length === 0}
                            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                            onClick={() => handleExportRows(table.getRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                        >
                            Export Page Rows
                        </Button>
                        <Button
                            disabled={
                                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                            }
                            //only export selected rows
                            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                        >
                            Export Selected Rows
                        </Button>
                    </Box>
                )}
            />

        </div>

    )
}

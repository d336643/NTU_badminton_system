// Unfinish, reference "https://levelup.gitconnected.com/displaying-pdf-in-react-app-6e9d1fffa1a9"
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import PDF from '../file/test.pdf';

const AllPages = () => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const { pdf } = PDF;

    return (
        <Document
            file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
        >
        {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
        </Document>
    );
}

export default AllPages;
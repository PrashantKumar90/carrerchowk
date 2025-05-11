import React from "react";

const PDFList = ({ pdfs }) => {
  return (
    <div className="mt-6 space-y-4">
      {pdfs.length > 0 ? (
        pdfs.map((pdf) => (
          <div key={pdf.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{pdf.name}</h3>
                <p className="text-sm text-gray-500">
                  {pdf.course} • {pdf.semester} • {pdf.year}
                </p>
              </div>
              <a 
                href={`/download/${pdf.id}`} 
                className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                download
              >
                Download
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-8 text-gray-500">No PDFs found. Try another search.</p>
      )}
    </div>
  );
};

export default PDFList;
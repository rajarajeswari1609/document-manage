import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
    const [documents, setDocuments] = useState([
        { _id: 1, filename: "Sample Document 1.pdf" },
        { _id: 2, filename: "Sample Document 2.docx" }
    ]);
    const [file, setFile] = useState(null);

    const handleUpload = () => {
        if (!file) return;
        const newDocument = { _id: documents.length + 1, filename: file.name };
        setDocuments([...documents, newDocument]);
        setFile(null);
    };

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc._id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <input type="file" className="border p-2 mt-4" onChange={(e) => setFile(e.target.files[0])} />
            <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleUpload}>Upload</button>
            <ul className="mt-4">
                {documents.map(doc => (
                    <li key={doc._id} className="flex justify-between items-center border p-2 mt-2">
                        {doc.filename}
                        <button 
                            className="bg-red-500 text-white p-1 ml-4"
                            onClick={() => handleDelete(doc._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
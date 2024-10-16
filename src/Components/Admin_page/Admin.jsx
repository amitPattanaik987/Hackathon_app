import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import upload from "../../assets/upload.png";
import { useFormContext } from '../FormContext';

export default function Admin() {
    const navigate = useNavigate();
    const { setspinner } = useFormContext();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Easy");

    const [problemStatements, setProblemStatements] = useState(
        Array(5).fill({
            statement: "",
            theme: "",
            category: { software: false, hardware: false }
        })
    );

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const handleProblemStatementChange = (index, field, value) => {
        const updatedStatements = [...problemStatements];
        updatedStatements[index] = { ...updatedStatements[index], [field]: value };
        setProblemStatements(updatedStatements);
    };


    const handleCategoryChange = (index, category) => {
        const updatedStatements = [...problemStatements];
        
        updatedStatements[index] = {
            ...updatedStatements[index],
            category: {
                software: category === "software" ? true : false,
                hardware: category === "hardware" ? true : false
            }
        };
        setProblemStatements(updatedStatements);
    };

    const addProblemStatementField = () => {
        setProblemStatements([
            ...problemStatements,
            { statement: "", theme: "", category: { software: false, hardware: false } }
        ]);
    };

    const handleSubmit = async () => {
        
        const filledStatements = problemStatements.filter(statement => statement.statement.trim() !== "");
        if (filledStatements.length < 5) {
            alert("Please fill in at least 5 problem statements.");
            return;
        }

        let responseData;
        let formData = new FormData();
        formData.append("image", image);
        setspinner(true);
        await fetch("https://hackathon-app-2.onrender.com/image_upload", {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        }).then((res) => res.json())
            .then((data) => { responseData = data; });

        if (responseData) {
            await fetch("https://hackathon-app-2.onrender.com/addhackathon", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, startDate, endDate, description, level, problemStatements: filledStatements ,responseData})
            }).then((res) => res.json())
                .then((data) => {
                    setspinner(false);
                    navigate('/home');
                }).catch(() => {
                    console.log("Internal Server Error");
                });
        } else {
            console.log("Error in uploading image");
        }
    };

    return (
        <div>
            <div className='header'>
                <p style={{ margin: 0 }}>Challenge Details</p>
            </div>
            <div className='form'>
                <div className='name all'>
                    <p>Challenge Name</p>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='Start-date all'>
                    <p>Start Date</p>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='end-date all'>
                    <p>End Date</p>
                    <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='description all'>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="10"
                        cols="50"
                        maxLength="5000"
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ border: "2px solid black" }}
                    ></textarea>
                </div>
                <div className='image all'>
                    <p>Image</p>
                    {imagePreview ? (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Uploaded preview" style={{ width: '150px', height: 'auto', borderRadius: "10px" }} />
                        </div>
                    ) : (
                        <>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Upload <img src={upload} alt="upload icon" />
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                hidden
                            />
                        </>
                    )}
                </div>
                <div className='drop-down all'>
                    <label htmlFor="dropdown">Level Type</label>
                    <select
                        id="dropdown"
                        onChange={(e) => setLevel(e.target.value)}
                        style={{ border: "2px solid black" }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className='problem-statements all'>
                    <p className='text-[25px] text-red-500'>Problem Statements (Minimum 5)</p>
                    {problemStatements.map((problem, index) => (
                        <div key={index} className="problem-section flex gap-6">
                            <input
                                type="text"
                                value={problem.statement}
                                onChange={(e) => handleProblemStatementChange(index, "statement", e.target.value)}
                                placeholder={`Problem Statement ${index + 1}`}
                                style={{ border: "2px solid black", marginBottom: "10px" }}
                                className='w-[50%]'
                            />
                            <input
                                type="text"
                                value={problem.theme}
                                onChange={(e) => handleProblemStatementChange(index, "theme", e.target.value)}
                                placeholder="Theme"
                                style={{ border: "2px solid black", marginBottom: "10px" }}
                                className='w-[30%]'
                            />
                            <div className="category-checkbox flex gap-4">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={problem.category.software}
                                        onChange={() => handleCategoryChange(index, "software")}
                                    />
                                    Software
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={problem.category.hardware}
                                        onChange={() => handleCategoryChange(index, "hardware")}
                                    />
                                    Hardware
                                </label>
                            </div>

                        </div>
                    ))}

                    <button type="button" onClick={addProblemStatementField}>
                        + Add More Problem Statement
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-success success"
                    onClick={handleSubmit}
                >
                    Create Challenge
                </button>
            </div>
        </div>
    );
}

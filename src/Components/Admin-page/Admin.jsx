import React from 'react';
import { useFormContext } from '../FormContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import upload from "../../assets/upload.png"

export default function Admin() {
    const { formData, setFormData, addHackathon } = useFormContext();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = () => {
        console.log('Submitted Data:', formData);
        addHackathon(formData); 

        setFormData({
            challengeName: '',
            startDate: '',
            endDate: '',
            description: '',
            image: null,
            level: 'Easy'
        });

        navigate('/');
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
                        name="challengeName"
                        value={formData.challengeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='Start-date all'>
                    <p>Start Date</p>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='end-date all'>
                    <p>End Date</p>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
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
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className='image all'>
                    <p>Image</p>
                    {formData.image ? (
                        <div className="image-preview">
                            <img src={formData.image} alt="Uploaded preview" style={{ width: '150px', height: 'auto' ,borderRadius:"10px"}} />
                        </div>
                    ) : (
                        <>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Upload <img src={upload} alt="upload icon" />
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                name="file-upload"
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
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
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

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import TextEditor from '../components/TextEditor';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { apiCall } from '../../api/apiCall';

const ContentDetails = () => {
    const editorRef = useRef(null);
    const [data, setData] = useState([])
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()
    const { t } = useTranslation()

    const fetchData = async () => {
        try {
            const url = `/account/viewContent/${id}`;
            const response = await apiCall("GET", url);
            setData(response.results.content);
            setEditedData(response.results.content)
            console.log(response.results.content);
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }




    useEffect(() => {
        fetchData()

        if (editorRef.current) {
            new Quill(editorRef.current, {
                modules: {
                    syntax: true,
                    toolbar: "#toolbar-container",
                },
                placeholder: "Compose an epic...",
                theme: "snow",
            });
        }
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['formula'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                ['clean']
            ]
        }
    };

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {/* <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll">
                <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
                    <h2 className="text-lg font-bold mb-4">{t("Content Details")}</h2>
                    <>
                        <div>
                            <div id="toolbar-container">
                                <span className="ql-formats">
                                    <select className="ql-font"></select>
                                    <select className="ql-size"></select>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-bold"></button>
                                    <button className="ql-italic"></button>
                                    <button className="ql-underline"></button>
                                    <button className="ql-strike"></button>
                                </span>
                                <span className="ql-formats">
                                    <select className="ql-color"></select>
                                    <select className="ql-background"></select>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-script" value="sub"></button>
                                    <button className="ql-script" value="super"></button>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-header" value="1"></button>
                                    <button className="ql-header" value="2"></button>
                                    <button className="ql-blockquote"></button>
                                    <button className="ql-code-block"></button>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-list" value="ordered"></button>
                                    <button className="ql-list" value="bullet"></button>
                                    <button className="ql-indent" value="-1"></button>
                                    <button className="ql-indent" value="+1"></button>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-direction" value="rtl"></button>
                                    <select className="ql-align"></select>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-link"></button>
                                    <button className="ql-image"></button>
                                    <button className="ql-video"></button>
                                    <button className="ql-formula"></button>
                                </span>
                                <span className="ql-formats">
                                    <button className="ql-clean"></button>
                                </span>
                            </div>
                            <div ref={editorRef} id="editor"></div>
                        </div>
                    </>

                    <div className='flex justify-between gap-3'>
                        <div className='grid grid-cols-6 border-[1px] h-full border-gray-300'>
                            <h2>Description (English)</h2>
                        </div>
                        <div className='grid grid-cols-6 border-[1px] h-full border-gray-300'>
                            <h2>Description (Hebrew)</h2>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll">
                <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
                    <h2 className="text-lg font-bold mb-4">{t("Content Details")}</h2>

                    <div className='flex gap-2'>
                        <div className="max-w-4xl mx-auto border-gray-300 rounded w-full">
                            <h2 className='text-xl font-semibold pb-2'>{t("Title")}(EN)</h2>
                            <div className="quill-wrapper w-full">
                                <ReactQuill
                                    theme="snow"
                                    name="content_en"
                                    value={editedData.content_title_en}
                                    onChange={handleChange}
                                    modules={modules}
                                    placeholder="Privacy Policy"
                                    className="custom-quill"
                                />
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto border-gray-300 rounded w-full">
                            <h2 className='text-xl font-semibold pb-2'>{t("Title")}(HE)</h2>
                            <div className="quill-wrapper w-full">
                                <ReactQuill
                                    theme="snow"
                                    name="content_en"
                                    value={editedData.content_title_he}
                                    onChange={handleChange}
                                    modules={modules}
                                    placeholder="Privacy Policy"
                                    className="custom-quill"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 py-4'>
                        <div className="max-w-4xl mx-auto border-gray-300 rounded w-full">
                            <h2 className='text-xl font-semibold pb-2'>{t("Description")}(EN)</h2>
                            <div className="quill-wrapper w-full">
                                <ReactQuill
                                    theme="snow"
                                    name="content_en"
                                    value={editedData.content_en}
                                    onChange={handleChange}
                                    modules={modules}
                                    placeholder="Privacy Policy"
                                    className="custom-quill"
                                />
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto border-gray-300 rounded w-full">
                            <h2 className='text-xl font-semibold pb-2'>{t("Description")}(HE)</h2>
                            <div className="quill-wrapper w-full">
                                <ReactQuill
                                    theme="snow"
                                    name="content_en"
                                    value={editedData.content_he}
                                    onChange={handleChange}
                                    modules={modules}
                                    placeholder="Privacy Policy"
                                    className="custom-quill"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ContentDetails

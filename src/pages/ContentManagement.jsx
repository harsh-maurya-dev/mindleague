import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { apiCall } from "../../api/apiCall";
import SkeletonTable from "../../shimmer/SkeletonTable";

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const fetchData = async () => {
    try {
      const url = "/account/getContent";
      const response = await apiCall("PATCH", url);
      setContents(response.results.content);
      console.log(response.results.content);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  function extractKeywords(description) {
    if (!description || typeof description !== "string") return "";

    const words = description.split(/\s+/).slice(0, 5); // Get the first 2-5 words
    return words.join(" ") + "...";
  }

  // Function to parse HTML content
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll">
        {
          isLoading ? <SkeletonTable /> :
            (<div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
              <div className="flex justify-between items-center py-4">
                <h2 className="text-lg font-bold mb-4">{t("Content Management")}</h2>
                <div className="flex justify-between gap-4">
                  <div className="bg-[#f1f1f1] flex justify-center items-center px-4 rounded-md py-4">
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-gray-100 focus:outline-none "
                    />
                    <IoSearch className="text-2xl" />
                  </div>
                </div>
              </div>
              {/* Main Table */}
              <div className="bg-white  rounded-md">
                <table className=" overflow-y-scroll">
                  <thead>
                    <tr className="text-sm text-left">
                      <th className="p-3 font-semibold text-md text-left">{t("S.NO.")}</th>
                      <th className="p-3 font-semibold text-md text-left">{t("Title")}</th>
                      <th className="p-3 font-semibold text-md text-left">{t("Title")}(HE)</th>
                      <th className="p-3 font-semibold text-md text-left">{t("Description")}</th>
                      <th className="p-3 font-semibold text-md text-left">{t("Description")}(HE)</th>
                      <th className="p-3  font-semibol text-md text-leftd">{t("STATUS")}</th>
                      <th className="p-3 font-semibold text-md text-left">{t("Modified")}</th>
                      <th className="p-3 font-semibold text-md text-left">{t("ACTION")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contents.map((content, index) => (
                      <tr key={index} className="border-b border-t text-[#828282] text-[14px]">
                        <td className="p-3">{index + 1}</td>
                        <td>
                          {/* Render title as HTML */}
                          <div
                            dangerouslySetInnerHTML={renderHTML(content.content_title_en)}
                          />
                        </td>
                        <td>
                          {/* Render title as HTML */}
                          <div
                            dangerouslySetInnerHTML={renderHTML(content.content_title_he)}
                          />
                        </td>
                        <td>
                          {/* Render content as HTML */}
                          <div className="flex"
                            dangerouslySetInnerHTML={renderHTML(extractKeywords(content.content_en))}
                          />
                        </td>
                        <td>
                          {/* Render content as HTML */}
                          <div className="flex"
                            dangerouslySetInnerHTML={renderHTML(extractKeywords(content.content_he))}
                          />
                        </td>
                        <td>
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => console.log('Toggle status logic here')}
                          >
                            <span
                              className={`block w-8 h-4 rounded-full transition-colors duration-300 ${content.status ? 'bg-[#007acc]' : 'bg-gray-400'
                                }`}
                            >
                              <span
                                className={`inline-block mb-[2px] w-3 h-3 transform transition-transform duration-300 rounded-full bg-white ${content.status ? 'translate-x-4' : 'translate-x-1'
                                  }`}
                              />
                            </span>
                          </div>
                        </td>
                        <td>{new Date(content.createdat).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Link
                              to={`/content-details/${content.id}`}
                              className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer"
                            >
                              <FaEye className="text-[12px]" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>)
        }
      </div>

    </>
  );
};

export default ContentManagement;

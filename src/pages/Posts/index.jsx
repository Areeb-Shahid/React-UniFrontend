import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/get_universities?${queryParams.toString().replace(/\+/g, '%20')}`);
        setUniversities(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [domain]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.domain.value) formData.append("domain", e.target.domain.value)
    if (e.target.duration.value) formData.append("duration", e.target.duration.value)
    if (e.target.university.value) formData.append("university", e.target.university.value)
    if (e.target.ielts.value) formData.append("ielts", e.target.ielts.value)
    if (e.target.cgpa.value) formData.append("cgpa", e.target.cgpa.value)
    if (e.target.fees.value) formData.append("fees", e.target.fees.value)
    if (e.target.independent_scholarship.value) formData.append("independent_scholarship", e.target.independent_scholarship.value)
    if (e.target.university_scholarship.value) formData.append("university_scholarship", e.target.university_scholarship.value)

    getUniversities(formData);
  };

  const getUniversities = async (params) => {
    try {
      const query = new URLSearchParams(params);
      const response = await axios.get(`http://127.0.0.1:5000/get_universities?${query.toString().replace(/\+/g, '%20')}`);
      setUniversities(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleClick = (domainName, universityName, durationTime, fee, ielts, cgpa, independent_scholarship, university_scholarship) => {
    localStorage.setItem("domain", domainName);
    localStorage.setItem("university", universityName);
    localStorage.setItem("duration", durationTime);
    localStorage.setItem("fees", fee);
    localStorage.setItem("ielts", ielts);
    localStorage.setItem("cgpa", cgpa);
    localStorage.setItem("indpSchlr", independent_scholarship);
    localStorage.setItem("uniSchlr", university_scholarship);
  };

  const displayYesNo = (value) => {
    return value === "1" ? "Yes" : "No";
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement.type === 'number') {
        document.activeElement.blur();
      }
    };

    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (

    <div className="container mx-auto p-4 flex">
      <div className="w-3/4 p-4">
        <h1 className="text-center text-4xl font-bold">Results of {domain} Domain</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            {Array.isArray(universities) && universities.length > 0 ? (
              universities.map((item, index) => (
                <Link
                  key={index}
                  to={`/post-details?domain=${item.domain}`}
                  className="block mb-4"
                  onClick={() =>
                    handleClick(
                      item.domain,
                      item.university,
                      item.duration,
                      item.fees,
                      item.ielts,
                      item.cgpa,
                      item.independent_scholarship,
                      item.university_scholarship
                    )
                  }
                >
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-14">
                    <div className="px-8 py-5 rounded shadow-lg bg-white hover:bg-gray-100">
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">ID:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.id}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">Domain:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.domain}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">Duration:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.duration} Months</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">University:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.university}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">Fees:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.fees}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">IELTS:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.ielts}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">CGPA:</h1>
                        <p className="text-neutralLight capitalize font-medium">{item.cgpa}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">Independent Scholarship:</h1>
                        <p className="text-neutralLight capitalize font-medium">{displayYesNo(item.independent_scholarship)}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <h1 className="font-bold text-lg">University Scholarship:</h1>
                        <p className="text-neutralLight capitalize font-medium">{displayYesNo(item.university_scholarship)}</p>
                      </div>
                    </div>
                    <div>{item.graph}</div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No universities found for the given domain</div>
            )}
          </div>
        )}
      </div>
      <div className="w-1/4 p-4">
        <div className="p-4 rounded shadow-lg bg-white">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input
                  type="text"
                  name="domain"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (should be in a months)</label>
                <input
                  type="number"
                  step="0.01"
                  name="duration"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm custom-number-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">University</label>
                <input
                  type="text"
                  name="university"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IELTS</label>
                <input
                  type="number"
                  step="0.01"
                  name="ielts"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fees</label>
                <input
                  type="number"
                  step="0.01"
                  name="fees"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Independent Scholarship</label>
                <select
                  name="independent_scholarship"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">University Scholarship</label>
               <select
                  name="university_scholarship"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

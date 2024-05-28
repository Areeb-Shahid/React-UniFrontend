import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const university = localStorage.getItem("university");
  const duration = localStorage.getItem("duration");
  const fees = localStorage.getItem("fees");
  const ielts = localStorage.getItem("ielts");
  const cgpa = localStorage.getItem("cgpa");
  const indpSchlr = localStorage.getItem("indpSchlr");
  const uniSchlr = localStorage.getItem("uniSchlr");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const descriptionResponse = await axios.get(
          `http://127.0.0.1:5000/description/${domain}/${university}`
        );
        setDescription(descriptionResponse.data.description);
      } catch (error) {
        console.log("Error fetching description");
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.post(
          `http://127.0.0.1:5000/recommendations`,
          { university }
        );
        // Ensure reviewsResponse.data.recommendation is an array before setting it to state

        setReviews(reviewsResponse.data.recommendation);
      } catch (error) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
    fetchReviews();
  }, [domain, university]);

  // Function to display "Yes" or "No" based on the value
  const displayYesNo = (value) => {
    return value === "1" ? "Yes" : "No";
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-2xl md:text-4xl font-bold capitalize mb-8">
        Detail info of {domain}
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{""}</div>
      ) : (
        <>
          <div className="p-5 bg-white shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <h3 className="font-bold mr-2">Domain:</h3>
                <p>{domain}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">University:</h3>
                <p>{university}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">Duration:</h3>
                <p>{duration}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">Fees:</h3>
                <p>{fees}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">IELTS:</h3>
                <p>{ielts}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">CGPA:</h3>
                <p>{cgpa}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">Independent Scholarship:</h3>
                <p>{displayYesNo(indpSchlr)}</p>
              </div>
              <div className="flex">
                <h3 className="font-bold mr-2">University Scholarship:</h3>
                <p>{displayYesNo(uniSchlr)}</p>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-lg text-neutralLight">{description}</p>
          </div>

          <div className="p-5 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>

            <div className="border border-gray-200 rounded p-4 mt-4">
              <p className="text-lg mb-2">{reviews}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;

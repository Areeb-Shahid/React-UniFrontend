import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your API endpoint
        const response = await fetch("http://127.0.0.1:5000/get_suggestions");
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  /**
   * Function to capitalize the first letter of each word
   */
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSuggestionClick = (suggestion) => {
    setDomain(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setDomain(userInput);

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  /**
   * This function is used to handle the click event of Search Button
   */
  const submitHandler = async (e) => {
    e.preventDefault();

    // Capitalize the first letter of each word in the domain input
    const capitalizedDomain = capitalizeWords(domain);

    navigate(`/posts?domain=${encodeURIComponent(capitalizedDomain)}`);
  };

  return (
    <div className="mt-10 sm:mt-14 lg:mt-20">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center font-syne font-semibold capitalize text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
        Navigate your educational journey <br className="hidden lg:block" />{" "}
        with ease!
      </h1>
      <h1 className="text-lg sm:text-2xl lg:text-3xl text-center mt-10 sm:mt-20 lg:mt-28 capitalize font-medium text-neutral">
        Enter your domain of interest below
      </h1>
      <form
        onSubmit={submitHandler}
        className="mt-10 sm:mt-14 lg:mt-16 md:flex items-start gap-4 max-w-3xl mx-auto"
      >
        <div className="relative w-full bg-black bg-opacity-90 rounded-md p-1">
              <input
                type="text"
                required
                value={domain}
                placeholder="Enter any domain name"
                className="w-full py-3 px-4 focus:outline-none"
                onChange={handleChange}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 100);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
        <button className="flex items-center justify-center gap-2 mt-3 md:mt-0 md:gap-1 py-3 w-full md:w-[180px] btn-blue active:scale-95 hover:opacity-80">
          Search <GoArrowRight fontSize={20} />
        </button>
      </form>
    </div>
  );
};

export default Home;

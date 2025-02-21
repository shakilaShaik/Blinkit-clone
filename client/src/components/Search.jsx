import React from "react";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  return (
    <div className="w-full h-full">
      {!isSearchPage ? (
        // not in search page
        <div
          onClick={redirectToSearchPage}
          className="w-full h-full flex items-center"
        >
          <TypeAnimation
            sequence={[
              'Search "milk"',
              1000,
              'Search "bread"',
              1000,
              'Search "sugar"',
              1000,
              'Search "panner"',
              1000,
              'Search "chocolate"',
              1000,
              'Search "curd"',
              1000,
              'Search "rice"',
              1000,
              'Search "egg"',
              1000,
              'Search "chips"',
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;

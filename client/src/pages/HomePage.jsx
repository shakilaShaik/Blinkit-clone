import React from "react";
import CardLoading from "../components/CardLoading";
const HomePage = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto my-2 grid grid-cols-2">
        {new Array(10).fill(null).map((c, index) => {
          return (
            <div className="bg-white p-4 min-h-4">
              <CardLoading />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;

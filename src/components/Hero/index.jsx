import React from "react";

const Hero = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let user = Object.fromEntries(formData.entries());
    let { fname, city, country } = user;
    let newUser = {
      fname,
      address: {
        city,
        country,
      },
    };

    console.log(newUser);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" />
        <input type="text" name="city" />
        <input type="text" name="country" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Hero;

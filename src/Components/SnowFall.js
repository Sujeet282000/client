"use client";

import SnowFall from "react-snowfall";

const Snowfall = () => {
  return (
    <Snowfall
     // Changes the snowflake color
     color="#b2b2b2"
     //   Mange the radius of the snow dit 
       radius={[0.02, 0.09]}
       size={[4, 4]}
       // Controls the number of snowflakes that are created (default 150)
       snowflakeCount={200}
    />
  );
};

export default SnowFall;

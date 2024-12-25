import React, { useState } from "react";

const Counter = () => {
  const [likes, setLike] = useState(0);

  return (
    <div>
      <h1>{likes}</h1>
      <button onClick={() => setLike(likes + 1)}>Increment</button>
      <button onClick={() => setLike(likes - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;

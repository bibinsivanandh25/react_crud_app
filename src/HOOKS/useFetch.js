import { useEffect, useState } from "react";

let useFetch = url => {
  let [state, setState] = useState(null);
  useEffect(() => {
    window
      .fetch(url)
      .then(data =>
        data.json().then(value => {
          setState(value);
        })
      )
      .catch(err => console.log(err));
  }, [url]);
  return state;
};
export default useFetch;

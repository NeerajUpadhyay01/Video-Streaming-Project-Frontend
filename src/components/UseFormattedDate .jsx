import { useState, useEffect } from "react";

const useFormattedDate = (dateString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (dateString) {
      const createdAtDate = new Date(dateString);
      const year = createdAtDate.getFullYear();
      const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = createdAtDate.getDate();
      const formatted = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
      setFormattedDate(formatted);
    }
  }, [dateString]);

  return formattedDate;
};

export default useFormattedDate;

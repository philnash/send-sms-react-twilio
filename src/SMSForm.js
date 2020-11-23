import React, { useState, useCallback } from "react";
import "./SMSForm.css";

const SMSForm = () => {
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onToChange = useCallback((event) => {
    setTo(event.target.value);
  }, []);

  const onBodyChange = useCallback((event) => {
    setBody(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setSubmitting(true);
      fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, body }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setError(false);
            setSubmitting(false);
            setTo("");
            setBody("");
          } else {
            setError(true);
            setSubmitting(false);
          }
        });
    },
    [to, body]
  );

  return (
    <form onSubmit={onSubmit} className={error ? "error sms-form" : "sms-form"}>
      <div>
        <label htmlFor="to">To:</label>
        <input type="tel" name="to" id="to" value={to} onChange={onToChange} />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea name="body" id="body" value={body} onChange={onBodyChange} />
      </div>
      <button type="submit" disabled={submitting}>
        Send message
      </button>
    </form>
  );
};

export default SMSForm;

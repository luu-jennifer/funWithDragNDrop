import { memo } from "react";
const styles = {
  border: "1px solid hotpink",
  padding: "0.5rem 1rem",
  cursor: "grab",
};
export const Box = memo(function Box({ title, pink, preview }) {
  const backgroundColor = pink ? "hotpink" : "white";
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {title}
    </div>
  );
});

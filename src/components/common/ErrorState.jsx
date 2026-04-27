export default function ErrorState({ message }) {
  if (!message) return null;

  return (
    <div style={styles.box}>
      {message}
    </div>
  );
}

const styles = {
  box: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "12px 14px",
    borderRadius: "10px",
    marginBottom: "12px",
  },
};
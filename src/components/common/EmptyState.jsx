export default function EmptyState({ message = "No data found." }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.text}>{message}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "30px",
    textAlign: "center",
    color: "#64748b",
  },
  text: {
    fontSize: "15px",
    fontWeight: 500,
  },
};
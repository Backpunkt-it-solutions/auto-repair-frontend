export default function Loader({text="Loading..."}) {
    return (
        <div style ={styles.wrapper}>
            <div style = {styles.card}>{text}</div>
        </div>
    )
}

const styles = {
    wrapper: {
        minHeight: "200px",
        display:"grid",
        placeItems:"center"
    },
    card: {
        padding: "16px 20px",
        borderRadius:"12px",
        background:"#68a2dd",
        
        fontWeight:600,
    }
}
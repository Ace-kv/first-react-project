const Achievement = ({icon, heading, text}: {
    icon: React.ReactElement,
    heading: string,
    text: string
}) => {
    return (
        <div className="achievement">
            {icon}
            <div className="achievement-rs-heading-and-text">
                <h3>{heading}</h3>
                <p className="achievement-rs-text">{text}</p>
            </div>
        </div>
    )
}

export default Achievement
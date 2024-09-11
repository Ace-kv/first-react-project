const CommunityCard = ({imageFileName, hTextT, hTextB, pText  }: {
    imageFileName: string,
    hTextT: string,
    hTextB: string,
    pText: string
}) => {
    const imageFile = `../../public/assets/icons/${imageFileName}`
    
    return (
        <div className="community-card">
            <div className="community-card-icon-and-heading">
                <img 
                    className="community-card-icon"
                    src={imageFile}    
                    alt={`${imageFileName}-icon`} 
                    width={61.7}
                    height={58.7}
                />
                <h3>{hTextT}</h3>
                <h3 className="clients-and-community-second-h3">{hTextB}</h3>
            </div>
            <p className="community-card-p">
                {pText}
            </p>
        </div>
    )
}

export default CommunityCard
import Button from "./Button.tsx"

const IllustrationHeadingTextBtnSec = ({imageFileName, imgWidth, hTextT, hTextB, pText }: {
    imageFileName: string,
    imgWidth: number,
    hTextT: string,
    hTextB: string,
    pText: string
    }) => {
    return (
        <div className="IHTB-wrapper">
            <div className="IHTB-content">
                <div className="IHTB-left-side">
                    <img 
                        src={`/public/assets/images/${imageFileName}.png`}
                        alt={`${imageFileName} illustration`}
                        width={imgWidth}
                    />
                </div>
                <div className="IHTB-right-side">
                    <div className="IHTB-RS-heading-and-text">
                        <h2>{hTextT}</h2>
                        <h2 className="IHTB-RS-second-h2">{hTextB}</h2>
                        <p className="IHTB-p">{pText}</p>
                    </div>
                    <Button text="Learn More" />
                </div>
            </div>
        </div>
    )
}

export default IllustrationHeadingTextBtnSec
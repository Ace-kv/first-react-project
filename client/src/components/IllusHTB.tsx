import Button from "./Button.tsx"
// import RIllustr from '../../public/assets/images/rafiki_Illustration.png'
// import PIllustr from '../../public/assets/images/pana_Illustration.png'

// const illustrMap: { [key: string]: string } = {
//     'rafiki_Illustration': RIllustr,
//     'pana_Illustration': PIllustr
// }

const IllustrationHeadingTextBtnSec = ({imageFileName, imgWidth, hTextT, hTextB, pText }: {
    imageFileName: string | undefined,
    imgWidth: number,
    hTextT: string,
    hTextB: string | undefined,
    pText: string
}) => {
    // const imageFile = illustrMap[imageFileName] || ''
    if (!imageFileName || !hTextB) return ''

    return (
        <div className="IHTB-wrapper">
            <div className="IHTB-content">
                <div className="IHTB-left-side">
                    <img 
                        src={imageFileName}
                        alt={`${hTextT}${hTextB}-illustration`}
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
import RightG from '../../public/assets/icons/Right-g.svg?react'

const CommunityUpdCard = ({imgName, imgWidth = 390, hText}: {
    imgName: string,
    imgWidth?: number,
    hText: string
}) => {
    return (
        <div className='comm-upd-card'>
            <img 
                src={`/src/assets/images/${imgName}.png`} 
                alt="" 
                width={imgWidth}
                // height={400}
                className="comm-upd-card-img"
            />
            <div 
                style={{ width: `${imgWidth * 0.8}px` }} 
                className="comm-upd-card-hText-and-btn"
            >
                <p className="comm-upd-card-hText">
                    {hText}
                </p>
                <a 
                    href="#"
                    className="comm-upd-card-btn"
                >
                    Read More 
                    <RightG
                        // stroke='#66BB69'
                        width={24} 
                        height={24}
                    />
                </a>
            </div>
        </div>
    )
}

export default CommunityUpdCard
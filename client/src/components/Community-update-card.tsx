import RightG from '../../public/assets/icons/Right-g.svg?react'
// import CCard1 from '../../public/assets/images/cCard-img1.png'
// import CCard2 from '../../public/assets/images/cCard-img2.png'
// import CCard3 from '../../public/assets/images/cCard-img3.png'

// const imageMap: { [key: string]: string } = {
//     'cCard-img1': CCard1,
//     'cCard-img2': CCard2,
//     'cCard-img3': CCard3
// }

const CommunityUpdCard = ({imgFile, imgWidth = 390, hText}: {
    imgFile: string,
    imgWidth?: number,
    hText: string | undefined
}) => {
    // const imageFile = imageMap[imgName] || ''

    if (!hText) return undefined

    return (
        <div className='comm-upd-card'>
            <img 
                src={imgFile} 
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
import memberIcon from '../../public/assets/icons/member-org-icon.png'
import natAsocIcon from '../../public/assets/icons/national-assoc-icon.png'
import clubsNgroupsIcon from '../../public/assets/icons/clubsNgroups-icon.png'

const iconMap: { [key: string]: string } = {             // index signature to allow dynamic keys
    'member-org-icon.png': memberIcon,
    'national-assoc-icon.png': natAsocIcon,
    'clubsNgroups-icon.png': clubsNgroupsIcon
}

const CommunityCard = ({imageFileName, hTextT, hTextB, pText  }: {
    imageFileName: string,
    hTextT: string,
    hTextB: string,
    pText: string
}) => {
    const imageFile: string = iconMap[imageFileName] || ''
    
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
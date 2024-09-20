import Members from '../../public/assets/icons/members.svg?react'
import Clubs from '../../public/assets/icons/clubs.svg?react'
import EventBookings from '../../public/assets/icons/event-bookings.svg?react'
import Payments from '../../public/assets/icons/payments.svg?react'

const iconMap: { [key: string]: React.ReactElement } = {
    members: <Members width={43} height={43}/>,
    clubs: <Clubs width={50} height={50}/>,
    eventBookings: <EventBookings width={45} height={45}/>,
    payments: <Payments width={43} height={43}/>
}

const Achievement = ({iconIdentifier, heading, text}: {
    iconIdentifier: string | undefined,
    heading: string | undefined,
    text: string | undefined
}) => {
    if (!iconIdentifier || !heading || !text) return undefined

    const iconComponent = iconMap[iconIdentifier] || undefined

    return (
        <div className="achievement">
            {iconComponent}
            <div className="achievement-rs-heading-and-text">
                <h3>{heading}</h3>
                <p className="achievement-rs-text">{text}</p>
            </div>
        </div>
    )
}

export default Achievement
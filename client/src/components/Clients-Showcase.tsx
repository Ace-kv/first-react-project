import client1 from '../../public/assets/images/client-1.png'
import client2 from '../../public/assets/images/client-2.png'
import client3 from '../../public/assets/images/client-3.png'
import client4 from '../../public/assets/images/client-4.png'
import client5 from '../../public/assets/images/client-5.png'
import client6 from '../../public/assets/images/client-6.png'
import client7 from '../../public/assets/images/client-7.png'

const clients = [client1, client2, client3, client4, client5, client6, client7]

const ClientShowcase = () => {

    return (
        <>
            {clients.map((client, index) => (
                <img src={client} alt={`client-logo-${index + 1}`} />
            ))}
        </>
    )
}

export default ClientShowcase
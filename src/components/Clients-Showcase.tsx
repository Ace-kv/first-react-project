const clients = [1, 2, 3, 4, 5, 6, 7]

const ClientShowcase = () => {
    return (
        <>
            {clients.map((client: number) => (
                <img src={`/src/assets/images/client-${client}.png`} alt={`client-logo-${client}`} />
            ))}
        </>
    )
}

export default ClientShowcase
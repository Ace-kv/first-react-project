import Navbar from '../components/Navbar.tsx'
import Button from '../components/Button.tsx'
// import HeroIllustration from '../../public/assets/images/hero-Illustration.png'
import ClientShowcase from '../components/Clients-Showcase.tsx'
import CommunityCard from '../components/Community-Card.tsx'
import IllustrationHeadingTextBtnSec from '../components/IllusHTB.tsx'
import Achievement from '../components/Achievement.tsx'
// import Members from '../../public/assets/icons/members.svg?react'
// import Clubs from '../../public/assets/icons/clubs.svg?react'
// import EventBookings from '../../public/assets/icons/event-bookings.svg?react'
// import Payments from '../../public/assets/icons/payments.svg?react'
import CommunityUpdCard from '../components/Community-update-card.tsx'
import Footer from '../components/Footer.tsx'
import { useEffect, useState } from 'react'
import Section from '../types/Section.ts'
import '../styles.css'

const Home = () => {
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ui-sections`)
  
        if (!res.ok) {
          throw new Error(`HTTP Error: Status: ${res.status}`)
        }
  
        const data = await res.json()
        setSections(data.sections)

      } catch (error) {
          console.error('Error fetching sections:', error)
      }
    }

    fetchSections()
    
  }, [])

  const renderSection = (section: Section) => {
    switch (section.component) {

      case 'HeroSection':
        return (
          <section key={section.id}>
            <div className='hero-wrapper'>
              <div className="hero-left-side">
                <div className="hero-text">
                  <div className="headline">
                    <h1>{section.props.title}</h1>
                    <h1 className='hero-text-colored-h1'>{section.props.title2}</h1>
                  </div>
                  <p className='hero-text-p'>{section.props.description}</p>
                </div>
                <Button text='Register'/>
              </div>
              <div className="hero-right-side">
                <img 
                  src={typeof(section.props.imageUrl) === 'string' ? section.props.imageUrl : ''} 
                  alt={`${section.component}-illustration`}
                  width={380.16}
                  height={390.3}
                  />
              </div>
            </div>
          </section>
        )

        case 'ClientSection':
          return (
            <section key={section.id}>
              <div className="clients-and-community-wrapper">
                <div className="clients-and-community-headings-and-text">
                  <h2>{section.props.title}</h2>
                  <p className='clients-and-community-p'>
                    {section.props.description}
                  </p>
                </div>
                <div className="client-logos">
                  <ClientShowcase imageUrls={section.props.imageUrlArr}/>
                </div>
              </div>
            </section>
          )

        case 'CommunitySection':
          return (
            <section key={section.id}>
              <div className="clients-and-community-wrapper">
                <div className="clients-and-community-headings-and-text">
                  <h2>
                    {section.props.title} 
                  </h2>
                  <h2 className="clients-and-community-second-h2">
                    {section.props.title2}
                  </h2>
                  <p className='clients-and-community-p'>
                    {section.props.description}
                  </p>
                </div>
                <div className="community-cards">
                  <CommunityCard 
                    imageFileName={
                      section.props.childCardComponent && section.props.childCardComponent.cImageUrlArr
                        ? section.props.childCardComponent.cImageUrlArr[0]
                        : ''
                    }
                    hTextT={section.props.childCardComponent ? section.props.childCardComponent.cTitle[0] : ''}
                    hTextB={
                      section.props.childCardComponent && section.props.childCardComponent.cTitle2
                        ? section.props.childCardComponent.cTitle2[0] 
                        : ''
                    }
                    pText={section.props.childCardComponent ? section.props.childCardComponent.cDescription[0] : ''}
                  />
                  <CommunityCard 
                    imageFileName={
                      section.props.childCardComponent && section.props.childCardComponent.cImageUrlArr
                        ? section.props.childCardComponent.cImageUrlArr[1]
                        : ''
                    }
                    hTextT={section.props.childCardComponent ? section.props.childCardComponent.cTitle[1] : ''}
                    hTextB={
                      section.props.childCardComponent && section.props.childCardComponent.cTitle2
                        ? section.props.childCardComponent.cTitle2[1] 
                        : ''
                    }
                    pText={section.props.childCardComponent ? section.props.childCardComponent.cDescription[1] : ''}
                  />
                  <CommunityCard 
                    imageFileName={
                      section.props.childCardComponent && section.props.childCardComponent.cImageUrlArr
                        ? section.props.childCardComponent.cImageUrlArr[2]
                        : ''
                    }
                    hTextT={section.props.childCardComponent ? section.props.childCardComponent.cTitle[2] : ''}
                    hTextB={
                      section.props.childCardComponent && section.props.childCardComponent.cTitle2
                        ? section.props.childCardComponent.cTitle2[2] 
                        : ''
                    }
                    pText={section.props.childCardComponent ? section.props.childCardComponent.cDescription[2] : ''}
                  />
                </div>
              </div>
            </section>
          )

        case 'IHTBSection1':
          return (
            <section key={section.id}>
              < IllustrationHeadingTextBtnSec 
                imageFileName={section.props.imageUrl}
                imgWidth={600}
                hTextT={section.props.title}
                hTextB={section.props.title2}
                pText={section.props.description}
              />
            </section>
          )

        case 'AchievementsSection':
          return (
            <section key={section.id}>
              <div className="achievements-wrapper">
                <div className="achiev-ls-heading-and-text">
                  <div className="achiev-heading">
                    <h2>{section.props.title}</h2>
                    <h2 className="achiev-colored-h2">{section.props.title2}</h2>
                  </div>
                  <p className="achiev-text">{section.props.description}</p>
                </div>
                <div className="achiev-rs-icon-and-stats">
                  <div className="achiev-rs-icon-and-stats-row">
                    <Achievement 
                      iconIdentifier={
                        section.props.childCardComponent?.cIconIdentifier
                          ? section.props.childCardComponent?.cIconIdentifier[0]
                          : ''
                        }
                      heading={section.props.childCardComponent?.cTitle[0]}
                      text={section.props.childCardComponent?.cDescription[0]}
                    />
                    <Achievement 
                      iconIdentifier={
                        section.props.childCardComponent?.cIconIdentifier
                          ? section.props.childCardComponent?.cIconIdentifier[1]
                          : ''
                        }
                      heading={section.props.childCardComponent?.cTitle[1]}
                      text={section.props.childCardComponent?.cDescription[1]}
                    />
                  </div>
                  <div className="achiev-rs-icon-and-stats-row">
                    <Achievement 
                      iconIdentifier={
                        section.props.childCardComponent?.cIconIdentifier
                          ? section.props.childCardComponent?.cIconIdentifier[2]
                          : ''
                        }
                      heading={section.props.childCardComponent?.cTitle[2]}
                      text={section.props.childCardComponent?.cDescription[2]}
                    />
                    <Achievement 
                      iconIdentifier={
                        section.props.childCardComponent?.cIconIdentifier
                          ? section.props.childCardComponent?.cIconIdentifier[3]
                          : ''
                        }
                      heading={section.props.childCardComponent?.cTitle[3]}
                      text={section.props.childCardComponent?.cDescription[3]}
                    />
                  </div>
                </div>
              </div>
            </section>
          )

        case 'IHTBSection2':
          return (
            <section key={section.id}>
              < IllustrationHeadingTextBtnSec 
                imageFileName={section.props.imageUrl}
                imgWidth={600}
                hTextT={section.props.title}
                hTextB={section.props.title2}
                pText={section.props.description}
              />
            </section>
          )

        case 'CommUpdSection':
          return (
            <section>
              <div className="comm-upd-wrapper">
                <div className="comm-upd-container">
                  <div className="comm-upd-heading-and-text">
                    <h2>{section.props.title}</h2>
                    <p className='comm-upd-text'>
                      {section.props.description}
                    </p>
                  </div>
                  <div className="comm-upd-cards">
                    <CommunityUpdCard 
                      imgFile={
                        section.props.childCardComponent?.cImageUrlArr 
                          ? section.props.childCardComponent?.cImageUrlArr[0]
                          : ''
                        }
                      // imgWidth={380}
                      hText={
                        section.props.childCardComponent?.cTitle
                          ? section.props.childCardComponent?.cTitle[0]
                          : ''
                        }
                    />
                    <CommunityUpdCard 
                      imgFile={
                        section.props.childCardComponent?.cImageUrlArr 
                          ? section.props.childCardComponent?.cImageUrlArr[1]
                          : ''
                        }
                      // imgWidth={380}
                      hText={
                        section.props.childCardComponent?.cTitle
                          ? section.props.childCardComponent?.cTitle[1]
                          : ''
                        }
                    />
                    <CommunityUpdCard 
                      imgFile={
                        section.props.childCardComponent?.cImageUrlArr 
                          ? section.props.childCardComponent?.cImageUrlArr[2]
                          : ''
                        }
                      // imgWidth={380}
                      hText={
                        section.props.childCardComponent?.cTitle
                          ? section.props.childCardComponent?.cTitle[2]
                          : ''
                        }
                    />
                  </div>
                </div>
              </div>
            </section>
          )
        
          default:
            return null
      }
  }

  return (
    <>
      <Navbar />

      {sections
        .filter((section) => section.isActive) // Filter active sections
        .sort((a, b) => a.order - b.order) // Sort sections by order
        .map(renderSection)
      }

      {/* HERO SECTION */}
      {/* <section>
        <div className='hero-wrapper'>
          <div className="hero-left-side">
            <div className="hero-text">
              <div className="headline">
                <h1>Lessons and insights</h1>
                <h1 className='hero-text-colored-h1'>from 8 years</h1>
              </div>
              <p className='hero-text-p'>Where to grow your business as a photographer: site or social media?</p>
            </div>
            <Button text='Register'/>
          </div>
          <div className="hero-right-side">
            <img 
              src={HeroIllustration} 
              alt="hero illustration"
              width={380.16}
              height={390.3}
              />
          </div>
        </div>
      </section> */}

      {/* CLIENTS SECTION */}
      {/* <section>
        <div className="clients-and-community-wrapper">
          <div className="clients-and-community-headings-and-text">
            <h2>Our Clients</h2>
            <p className='clients-and-community-p'>
              We have been working with some Fortune 500+ clients
            </p>
          </div>
          <div className="client-logos">
            <ClientShowcase />
          </div>
        </div>
      </section> */}

      {/* COMMUNITY SECTION */}
      {/* <section>
        <div className="clients-and-community-wrapper">
          <div className="clients-and-community-headings-and-text">
            <h2>
              Manage your entire community 
            </h2>
            <h2 className="clients-and-community-second-h2">
              in a single system
            </h2>
            <p className='clients-and-community-p'>
              Who is Nextcent suitable for?
            </p>
          </div>
          <div className="community-cards">
            <CommunityCard 
              imageFileName='member-org-icon.png'
              hTextT='Membership'
              hTextB='Organisations'
              pText='Our membership management software provides full automation of membership renewals and payments'
            />
            <CommunityCard 
              imageFileName='national-assoc-icon.png'
              hTextT='National'
              hTextB='Associations'
              pText='Our membership management software provides full automation of membership renewals and payments'
            />
            <CommunityCard 
              imageFileName='clubsNgroups-icon.png'
              hTextT='Clubs and'
              hTextB='Groups'
              pText='Our membership management software provides full automation of membership renewals and payments'
            />
          </div>
        </div>
      </section> */}

      {/* IHTB SECTION 1 */}
      {/* <section>
        < IllustrationHeadingTextBtnSec 
          imageFileName='rafiki_Illustration'
          imgWidth={600}
          hTextT='The unseen of spending three '
          hTextB='years at Pixelgrade'
          pText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan 
                 quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. 
                 Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. 
                 Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.'
        />
      </section> */}

      {/* ACHIEVEMENTS SECTION */}
      {/* <section>
        <div className="achievements-wrapper">
          <div className="achiev-ls-heading-and-text">
            <div className="achiev-heading">
              <h2>Helping a local</h2>
              <h2 className="achiev-colored-h2">business reinvent itself</h2>
            </div>
            <p className="achiev-text">We reached here with our hard work and dedication</p>
          </div>
          <div className="achiev-rs-icon-and-stats">
            <div className="achiev-rs-icon-and-stats-row">
              <Achievement 
                icon={<Members width={43} height={43}/>}
                heading='2,245,341'
                text='Members'
              />
              <Achievement 
                icon={<Clubs width={50} height={50}/>}
                heading='46,328'
                text='Clubs'
              />
            </div>
            <div className="achiev-rs-icon-and-stats-row">
              <Achievement 
                icon={<EventBookings width={45} height={45}/>}
                heading='828,867'
                text='Event Bookings'
              />
              <Achievement 
                icon={<Payments width={43} height={43}/>}
                heading='1,926,436'
                text='Payments'
              />
            </div>
          </div>
        </div>
      </section> */}
       
      {/* IHTB SECTION 2 */}
      {/* <section>
        < IllustrationHeadingTextBtnSec 
          imageFileName='pana_Illustration'
          imgWidth={600}
          hTextT='How to design your site footer like '
          hTextB='we did'
          pText='Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, 
                 massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. 
                 In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. 
                 In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla 
                 commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. 
                 Donec consectetur faucibus ipsum id gravida.'
        />
      </section> */}

      {/* COMMUNITY UPDATES SECTION */}
      {/* <section>
        <div className="comm-upd-wrapper">
          <div className="comm-upd-container">
            <div className="comm-upd-heading-and-text">
              <h2>Caring is the new marketing</h2>
              <p className='comm-upd-text'>
                The Nextcent blog is the best place to read about the latest membership insights, trends and more. 
                See who's joining the community, read about how our community are increasing their membership income and 
                lots more.
              </p>
            </div>
            <div className="comm-upd-cards">
              <CommunityUpdCard 
                imgName='cCard-img1'
                // imgWidth={380}
                hText='Creating Streamlined Safeguarding Processes with OneRen'
              />
              <CommunityUpdCard 
                imgName='cCard-img2'
                hText='What are your safeguarding responsibilities and how can you manage them?'
              />
              <CommunityUpdCard 
                imgName='cCard-img3'
                hText='Revamping the Membership Model with Triathlon in/at Australia'
              />
            </div>

          </div>
        </div>
      </section> */}

      {/* FOOTER */}
      <Footer />
    </>
  )
}

export default Home

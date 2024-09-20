export default interface Section {
    id: string,
    component: string,
    isActive: boolean,
    order: number,
    props: {
      title: string,
      title2?: string,
      description: string,
      buttonText?: string,
      imageUrl?: string,
      imageUrlArr?: string[]
      childCardComponent?: {
        cTitle: string[],
        cTitle2?: string[],
        cDescription?: string[],
        cImageUrlArr?: string[]
        cIconIdentifier?: string[]
      }
    }
}
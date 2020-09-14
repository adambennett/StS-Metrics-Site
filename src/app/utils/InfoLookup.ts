export class InfoLookup {

  static getImageFromS3(imageName: string) {
    return 'http://elasticbeanstalk-us-east-2-677103498209.s3.us-east-2.amazonaws.com/duelist-images/' + imageName + '.png';
  }

  static getLookupCard(card: string): string {
    const regexp = new RegExp('^(.*?)\\+');
    return regexp.exec(card) != null ? regexp.exec(card)[1] : card;
  }

}



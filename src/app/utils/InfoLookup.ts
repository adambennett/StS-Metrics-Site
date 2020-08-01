export class InfoLookup {

  static getLookupCard(card: string): string {
    const regexp = new RegExp('^(.*?)\\+');
    return regexp.exec(card) != null ? regexp.exec(card)[1] : card;
  }

}



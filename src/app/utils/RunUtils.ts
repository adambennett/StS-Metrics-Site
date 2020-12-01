import {RunLog} from '../models/RunLog';
import {DateFormatter} from './DateFormatter';
import * as lookup from 'country-code-lookup'

export class Utilities {

  static characterNameMatcher(char: string, run: RunLog): boolean {
    return ((char === 'THE_DUELIST' && (run.deck !== 'NotYugi' || run.characterName.startsWith('The Duelist'))) || run.characterName === char);
  }

  static matchAtLeastOneSelectedCharacter(characterFilter: string[], run: RunLog, all: boolean): boolean {
    if (characterFilter.length < 1) {
      return all;
    }
    for (let i = 0; i < characterFilter.length; i++) {
      let char = characterFilter[i];
      char = char === 'The Duelist' || char === 'THE_DUELIST' ? 'THE_DUELIST' : char;
      if (Utilities.characterNameMatcher(char, run)) {
        return true;
      }
    }
    return false;
  }

  static matchAtLeastOneSelectedCountry(countryFilter: string[], run: RunLog, all: boolean): boolean {
    if (countryFilter.length < 1) {
      return all;
    }
    for (let i = 0; i < countryFilter.length; i++) {
      const locale = countryFilter[i].toLowerCase();
      const country = lookup.byCountry(countryFilter[i]);
      const runCountry = run.country ? run.country.toLowerCase() : null;
      const localizedCountry = country ? country.iso2.toString().toLowerCase() : '';
      if (locale === runCountry || (runCountry === localizedCountry)) {
        return true;
      }
    }
    return false;
  }

  static matchSelectedTime = (timeFilter: string, run: RunLog, all: boolean): boolean =>  timeFilter === '' ? all : DateFormatter.runMatchesTimeFilter(run, timeFilter);

  static matchFilterToRunProperty = (runProperty: string, filter: string[], run: RunLog, all: boolean): boolean => {
    if (filter.length < 1) {
      return all;
    }
    for (let i = 0; i < filter.length; i++) {
      let deck = filter[i];
      if (deck === run[runProperty]) {
        return true;
      }
    }
    return false;
  }

  static toggleFilter(show: string): void {
    if (show === 'show') {
      document.getElementById('filter-box').style.display = 'block';
      document.getElementById('hide-filters').style.display = 'block';
      document.getElementById('show-filters').style.display = 'none';
    } else {
      document.getElementById('filter-box').style.display = 'none';
      document.getElementById('hide-filters').style.display = 'none';
      document.getElementById('show-filters').style.display = 'block';
    }
  }
}

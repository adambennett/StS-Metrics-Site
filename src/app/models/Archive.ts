import {PathImage} from "./PathImage";

export interface PathIconArchive {
  Icons: PathImage[];
}

export const Archive: PathIconArchive = {
  Icons: [
    { id: 'BOSS',
      url:'/assets/path/boss.png'
    },
    { id: 'T',
      url:'/assets/path/chest.png'
    },
    { id: '?',
      url:'/assets/path/unknown.png'
    },
    { id: 'R',
      url:'/assets/path/rest.png'
    },
    { id: 'E',
      url:'/assets/path/elite.png'
    },
    { id: 'M',
      url:'/assets/path/monster.png'
    },
    { id: '$',
      url:'/assets/path/shop.png'
    }
   ]
}

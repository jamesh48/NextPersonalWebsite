const cFLink = process.env.NEXT_PUBLIC_CLOUDFRONTLINK;

const portfolioDataJson = [
  {
    title: 'Strava Report Generator (js v1)',
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    imgUrl: `${cFLink}/main/main-images/Strava_Results_Generator.jpg`,
    github: [
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/Strava-Report-Generator',
      },
    ],
  },
  {
    title: 'fullstackhrivnak.com (js v1)',
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    imgUrl: `${cFLink}/main/main-images/GES.jpg`,
    github: [
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/PersonalWebsite',
      },
    ],
  },
  {
    title: 'Beatminesweeper.app',
    imgUrl: `${cFLink}/main/main-images/beatminesweeperss.png`,
    cssStyles: {
      backgroundColor: 'black',
      color: 'ivory',
    },
    github: [
      // {
      //   title: 'Deployed Website',
      //   link: 'https://www.beatminesweeper.app',
      // },
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/Mini-Games/tree/master/beatminesweeper',
      },
    ],
  },
  {
    title: 'Job Application Express',
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    imgUrl: `${cFLink}/main/main-images/indeedautomation.png`,
    github: [
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/job-application-express',
      },
    ],
  },
  {
    title: 'Strava Report Generator (ts v2)',
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    imgUrl: `${cFLink}/main/main-images/Strava_Results_Generator.jpg`,
    github: [
      {
        title: 'Deployed Website',
        link: 'https://www.stravareportgenerator.com',
      },
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/next-strava-report-generator',
      },
      {
        title: 'Python Backend Github',
        link: 'https://github.com/jamesh48/SRG-Python',
      },
    ],
  },
  {
    title: 'fullstackhrivnak.com (ts v2)',
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    imgUrl: `${cFLink}/main/main-images/GES.jpg`,
    github: [
      {
        title: 'Github',
        link: 'https://github.com/jamesh48/NextPersonalWebsite',
      },
    ],
  },
  {
    title: 'steammop.app',
    cssStyles: {
      backgroundColor: 'black',
      color: 'ivory',
    },
    imgUrl: `${cFLink}/main/main-images/backendArchitecture.jpeg`,
    github: [
      {
        title: 'Steammop.app Proxy Server',
        link: 'https://github.com/rpt26-sdc-prototype/tim-proxy',
      },
      {
        title: 'Steammop.app Reviews Service',
        link: 'https://github.com/rpt26-sdc-prototype/tim-review-service',
      },
      {
        title: 'Steammop.app Reviews Database',
        link: 'https://github.com/rpt26-sdc-prototype/sdc-reviews-db',
      },
      {
        title: 'Steammop.app App Server',
        link: 'https://github.com/rpt26-sdc-prototype/app-server-1',
      },
    ],
  },
  {
    title: 'Fjakeraven.com',
    imgUrl: `${cFLink}/main/main-images/fec.jpg`,
    cssStyles: {
      backgroundColor: 'ivory',
      color: 'black',
    },
    github: [
      {
        title: 'Fjakeraven Proxy Server',
        link: 'https://github.com/rpt26-fec-tianwen/james-proxy-server',
      },
      {
        title: 'Product Details Service',
        link: 'https://github.com/rpt26-fec-tianwen/james-service-1',
      },
    ],
  },
];

export default portfolioDataJson;

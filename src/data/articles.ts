import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'tata-mahindra-suv-story',
    category: 'INDIA AUTO',
    title: 'How Tata Motors & Mahindra Reshaped the Indian SUV Market',
    subtitle: 'From rugged military workhorses to world-class safety pioneers and EV innovators.',
    author: 'Rajesh Sharma',
    authorRole: 'Senior Automotive Analyst, New Delhi',
    date: 'OCT 14, 2026',
    readTime: '8 Min Read',
    readMinutes: 8,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Fig 1.0 — High Ground Clearance & Monocoque Chassis Architecture',
    excerpt: 'An in-depth analysis of how indigenous manufacturers redefined utility, 5-star Global NCAP safety ratings, and modern road presence for Indian consumers.',
    keywords: ['Tata', 'Mahindra', 'SUV', 'Nexon', 'Thar', 'Scorpio-N', 'Harrier', 'Safety'],
    keyTakeaways: [
      'Indian SUV buyers transformed from prioritizing fuel economy alone to demanding 5-star crash safety and ADAS capabilities.',
      'Tata Motors pioneered accessible passenger EV adoption in India with its Gen-2 acti.ev architecture.',
      'Mahindra successfully bridged genuine lifestyle off-roading with premium highway cruising manners.',
      'Domestic manufacturers now command the highest market share in the premium compact and mid-size SUV sectors.'
    ],
    sections: [
      {
        heading: 'The Shift From Agricultural Utility to Highway Dominance',
        paragraphs: [
          'Two decades ago, the term "SUV" in the Indian subcontinent evoked images of rugged, spartan utility vehicles. Workhorses like the original Mahindra Armada, the classic Bolero, and the ubiquitous Tata Sumo were built to withstand rural cart tracks and relentless monsoons, with little consideration for NVH (noise, vibration, harshness) levels or highway stability.',
          'Fast forward to 2026, and the Indian passenger vehicle landscape has undergone a monumental tectonic shift. Over 52% of all passenger cars sold in the country are now SUVs. Crucially, it is not imported multinational marques dictating this segment, but home-grown giants: Tata Motors and Mahindra & Mahindra.'
        ],
        quote: 'Safety and design are no longer optional extras in India — they have become foundational entry requirements for every modern buyer.',
        quoteAuthor: 'Rajesh Sharma, Automotive Intelligence Group'
      },
      {
        heading: 'The Safety Revolution: 5-Star Global NCAP as a Market Standard',
        paragraphs: [
          'The turning point came when Tata Motors deliberately staked its brand turnaround on passive safety. When the Tata Nexon secured India’s first 5-star adult occupant Global NCAP safety score, consumer consciousness transformed almost overnight.',
          'Mahindra responded with equal engineering ferocity, designing the XUV300, XUV700, and Scorpio-N with high-tensile boron steel architectures and comprehensive ADAS radar-camera suites. Suddenly, Indian cars were outperforming established global competitors in international crash testing standards.'
        ],
        specSheet: [
          { label: 'Platform Architecture', value: 'OMEGARC (Tata) / 3G Hydroformed Steel (Mahindra)' },
          { label: 'Safety Benchmark', value: '5-Star Global NCAP & Bharat NCAP Certified' },
          { label: 'Powertrain Diversity', value: 'mStallion Turbo-Petrol, mHawk Diesel, acti.ev Pure Electric' },
          { label: 'Segment Market Share', value: '>51% Domestic SUV Segment Leadership' }
        ]
      },
      {
        heading: 'Born Electric: The Next Frontier of Indigenous Mobility',
        paragraphs: [
          'With Tata commanding upwards of 68% of the electric four-wheeler market through the Nexon.ev, Punch.ev, and Curvv.ev, the race has shifted to dedicated pure-electric platforms. Mahindra’s "Born Electric" (BE) lineage, engineered in Banbury, UK and Chennai, leverages modular 60-80 kWh battery packs with ultra-fast 175 kW DC charging.',
          'These are not mere badge-engineered conversions; they represent ground-up engineering prowess tailored for extreme tropical ambient temperatures, dust ingress, and unpredictable asphalt conditions.'
        ]
      }
    ]
  },
  {
    id: 'indian-ev-ecosystem',
    category: 'EV REVOLUTION',
    title: "India's EV Ecosystem: From Two-Wheelers to Global Export Hub",
    subtitle: 'How localized manufacturing, battery innovation, and urban commuting drove rapid adoption.',
    author: 'Ananya Roy',
    authorRole: 'Clean Tech & Mobility Correspondent, Bengaluru',
    date: 'OCT 12, 2026',
    readTime: '7 Min Read',
    readMinutes: 7,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Rapid DC charging network deployment across metro corridors',
    excerpt: 'Examining electric scooters, battery swapping networks, and how Indian EV technology is scaling internationally into ASEAN and European markets.',
    keywords: ['EV', 'Electric', 'Battery', 'Ola', 'Ather', 'Two-Wheeler', 'Clean Energy'],
    keyTakeaways: [
      'India’s EV revolution is bottom-up: high two-wheeler density makes micro-mobility the fastest pathway to zero emissions.',
      'Battery swapping infrastructure has reduced commercial fleet downtime to less than two minutes.',
      'Indigenous thermal management systems solve battery degradation in 45°C Indian summer conditions.',
      'Domestic manufacturers have begun exporting specialized lightweight EVs to Southeast Asia and Latin America.'
    ],
    sections: [
      {
        heading: 'Why Two-Wheelers Spearhead Electrification',
        paragraphs: [
          'Unlike Western economies where electric adoption started with expensive luxury sedans and full-size electric pickups, India’s electric revolution is taking place on two wheels. With over 250 million registered two-wheelers across the nation, scooters and commuter motorcycles represent the lifeblood of daily urban transport.',
          'Startups like Ather Energy, alongside industrial giants like TVS and Bajaj, recognized that the high operating miles of Indian commuters made Total Cost of Ownership (TCO) the primary driver of rapid conversion.'
        ]
      },
      {
        heading: 'Thermal Management Under Extreme Climatic Stress',
        paragraphs: [
          'Engineering lithium-ion battery packs that survive continuous 45°C ambient heat in Delhi or Chennai without premature thermal runaway required bespoke pack chemistry and active phase-change cooling solutions.',
          'The resulting engineering solutions have proven so resilient that global OEMs are now partnering with Indian tier-1 suppliers to source thermal-jacketed battery enclosures for tropical export markets.'
        ],
        quote: 'If a battery management system can survive three summers of Mumbai humidity and Delhi traffic jams, it can survive anywhere on Earth.',
        quoteAuthor: 'Dr. Vivek Menon, Indian Battery Consortium'
      }
    ]
  },
  {
    id: 'royal-enfield-heritage',
    category: 'TWO WHEELS',
    title: 'The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity',
    subtitle: 'How Chennai became the global epicenter for mid-size motorcycle manufacturing.',
    author: 'Vikram Sengupta',
    authorRole: 'Motorcycle Editor & Test Rider, Pune',
    date: 'OCT 10, 2026',
    readTime: '6 Min Read',
    readMinutes: 6,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'The Sherpa 450 Liquid-Cooled Single-Cylinder Powerplant',
    excerpt: 'The journey of the Bullet, Interceptor, and Himalayan platforms in captivating riders across North America, Europe, and Asia.',
    keywords: ['Royal Enfield', 'Himalayan', 'Bullet', 'Motorcycle', 'Chennai', 'Mid-Size'],
    keyTakeaways: [
      'Royal Enfield owns over 85% of the 250cc-750cc motorcycle segment in India.',
      'The transition from push-rod air-cooled engines to the Sherpa 450 DOHC liquid-cooled unit marks a pivotal engineering milestone.',
      'Pure tactile character, low-end torque, and accessible seat heights created a cult following worldwide.'
    ],
    sections: [
      {
        heading: 'Character Over Pure Horsepower',
        paragraphs: [
          'In an era dominated by hyper-revving sportbikes fitted with six-axis IMUs, launch control, and endless digital screens, Royal Enfield carved out a commanding global niche by doubling down on analog tactile joy.',
          'From the thump of the venerable Cast Iron Bullet to the refined 270-degree firing order of the 650 Twins, Royal Enfield proved that motorcycling is fundamentally an emotional communion between rider and machine.'
        ]
      },
      {
        heading: 'The Himalayan 450: The High-Altitude Crucible',
        paragraphs: [
          'The introduction of the Himalayan 450, powered by the brand’s first liquid-cooled DOHC "Sherpa 450" engine, was forged directly in the crucible of Ladakh’s Khardung La pass. With 40 horsepower, ride-by-wire throttle, and Showa upside-down forks, it balances authentic Himalayan off-road capability with all-day interstate cruising poise.'
        ]
      }
    ]
  },
  {
    id: 'ferrari-porsche-supercars',
    category: 'PERFORMANCE',
    title: 'What Makes a Supercar Truly Iconic in 2026?',
    subtitle: 'Hybrid V12 engines, active aerodynamics, and the delicate balance between analog feedback and speed.',
    author: 'Editorial Team',
    authorRole: 'Global Performance Desk, Maranello & Stuttgart',
    date: 'OCT 08, 2026',
    readTime: '9 Min Read',
    readMinutes: 9,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Aerodynamic active rear diffuser and carbon-ceramic brake assembly',
    excerpt: 'Comparing high-revving naturally aspirated engines with modern electric torque-vectoring hypercars.',
    keywords: ['Supercar', 'Ferrari', 'Porsche', 'V12', 'Performance', 'Aerodynamics', 'Track'],
    keyTakeaways: [
      'Straight-line 0-100 km/h acceleration is democratized by EVs; supercar prestige now hinges on steering feedback and mechanical acoustics.',
      'Active ground-effect tunnels and flex-wing aerodynamics produce downforce without drag penalties.',
      'Plug-in hybrid setups bridge instant low-end electric torque with howling 9,000 RPM internal combustion.'
    ],
    sections: [
      {
        heading: 'Beyond the Numbers: The Search for Soul',
        paragraphs: [
          'When a family hatchback can sprint from 0 to 100 km/h in under three seconds thanks to twin electric motors, the traditional currency of supercar supremacy has fundamentally changed.',
          'Today, genuine hypercar prestige is measured in acoustic resonance, torsional chassis feedback through the steering rack, and the goosebumps induced by downshifting into a high-speed apex.'
        ]
      }
    ]
  },
  {
    id: 'f1-aerodynamics-explained',
    category: 'MOTORSPORT',
    title: "How Formula 1 Aerodynamics Shapes Tomorrow's Road Vehicles",
    subtitle: 'Ground effect tunnels, carbon composite structures, and thermal management secrets.',
    author: 'Marcus Vance',
    authorRole: 'Chief Technical Correspondent, Silverstone',
    date: 'OCT 05, 2026',
    readTime: '8 Min Read',
    readMinutes: 8,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Venturi tunnels creating underfloor low-pressure suction',
    excerpt: 'From downforce management to brake energy recovery, how F1 track tech trickles down to production cars.',
    keywords: ['F1', 'Aerodynamics', 'Downforce', 'Motorsport', 'Engineering', 'Venturi'],
    keyTakeaways: [
      'Underbody Venturi tunnels deliver high downforce with minimal induced aerodynamic drag.',
      'F1 brake-by-wire and MGU-K energy harvesting directly inspired contemporary EV regenerative braking.',
      'Supercomputing CFD simulations allow engineers to refine drag coefficients down to 0.20 on road-going sedans.'
    ],
    sections: [
      {
        heading: 'The World’s Most High-Speed Laboratory',
        paragraphs: [
          'Formula 1 has always been a ruthless technological incubator. But with the introduction of ground-effect aerodynamics and 50%+ thermal efficiency hybrid power units, the crossover into road car architecture has never been more immediate.',
          'Modern electric vehicles, which require slippery aerodynamic profiles to maximize highway range, rely on the exact vortex-shedding principles pioneered by Grand Prix aerodynamicists.'
        ]
      }
    ]
  },
  {
    id: 'software-defined-vehicles',
    category: 'INDIA AUTO',
    title: 'Software-Defined Vehicles: How Electronics are Replacing Mechanical Links',
    subtitle: 'OTA updates, drive-by-wire steering, and artificial intelligence in contemporary Indian cars.',
    author: 'Rajesh Sharma',
    authorRole: 'Senior Automotive Analyst, New Delhi',
    date: 'OCT 02, 2026',
    readTime: '6 Min Read',
    readMinutes: 6,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Centralized domain controller running zonal automotive architecture',
    excerpt: 'Inside modern car architectures where software algorithms dictate suspension geometry, regenerative braking, and safety interventions.',
    keywords: ['Software', 'OTA', 'ADAS', 'AI', 'Connected Car', 'India Auto'],
    keyTakeaways: [
      'Modern vehicles run over 100 million lines of code across centralized domain controllers.',
      'Over-the-air firmware updates can improve battery efficiency, power output, and suspension damping overnight.',
      'Autonomous emergency braking and adaptive cruise control are rapidly penetrating sub-20 lakh rupee cars in India.'
    ],
    sections: [
      {
        heading: 'The Transition from 80 ECUs to Central Compute',
        paragraphs: [
          'In older vehicles, every minor subsystem—from the power windows to the anti-lock braking module—had its own independent Electronic Control Unit (ECU). Today, automotive architectures are consolidating into unified zonal compute platforms.',
          'This allows Indian manufacturers to roll out safety optimizations, new steering weight profiles, and navigation enhancements directly to owner driveways via cloud connectivity.'
        ]
      }
    ]
  },
  {
    id: 'adventure-motorcycling-india',
    category: 'TWO WHEELS',
    title: 'The Rise of Adventure Motorcycling Culture across India',
    subtitle: 'Why middleweight ADV bikes are conquering the Himalayas and coastal highways alike.',
    author: 'Vikram Sengupta',
    authorRole: 'Motorcycle Editor & Test Rider, Pune',
    date: 'SEP 28, 2026',
    readTime: '7 Min Read',
    readMinutes: 7,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
    imageCaption: '21-inch front spoke wheels traversing high-altitude river crossings',
    excerpt: 'Long-travel suspension, dual-purpose tires, and the booming touring community in Leh-Ladakh, Spiti Valley, and the Western Ghats.',
    keywords: ['ADV', 'Adventure', 'Himalayas', 'Touring', 'KTM', 'Royal Enfield', 'BMW GS'],
    keyTakeaways: [
      'Middleweight ADVs (300cc-500cc) hit the golden balance between rough-road capability and manageable curb weight.',
      'Upright ergonomics and 200mm+ suspension travel handle broken pavement, speed breakers, and off-road trails effortlessly.',
      'Motorcycle touring clubs and high-altitude rallies have experienced a 300% surge in participation over the last five years.'
    ],
    sections: [
      {
        heading: 'Built for the Real World',
        paragraphs: [
          'While hypersport motorcycles look sensational on smooth race tracks, the reality of Indian highways demands generous ground clearance, plush long-travel damping, and a commanding upright vantage point over chaotic city traffic.',
          'The adventure bike has become the two-wheeled equivalent of the SUV: practical, commanding, and ready to tackle a spontaneous 2,000-kilometer overland expedition.'
        ]
      }
    ]
  },
  {
    id: 'classic-car-restoration-heritage',
    category: 'PERFORMANCE',
    title: 'Preserving Automotive Heritage: Vintage Car Restoration in India',
    subtitle: 'The master artisans keeping rare vintage Rolls-Royces, Jaguars, and Ambassador cars alive.',
    author: 'Editorial Team',
    authorRole: 'Historical Archives Desk, Jaipur & Kolkata',
    date: 'SEP 25, 2026',
    readTime: '8 Min Read',
    readMinutes: 8,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Hand-wheeled aluminum body panels and bespoke period-correct upholstery',
    excerpt: 'Hand-beaten metal panels, engine rebuilds, and the unrelenting passion behind classic automotive preservation.',
    keywords: ['Vintage', 'Classic', 'Restoration', 'Rolls-Royce', 'Ambassador', 'Heritage'],
    keyTakeaways: [
      'India holds some of the world’s most unique pre-war coachbuilt automobiles commissioned by erstwhile royal families.',
      'Master panel-beaters in Kolkata and Mumbai reconstruct fenders using traditional English wheels and wooden bucks.',
      'Concourse d’Elegance events in India now attract international judges and collectors from around the globe.'
    ],
    sections: [
      {
        heading: 'Living History on Four Wheels',
        paragraphs: [
          'Hidden behind unassuming garage shutters in Jaipur, Mumbai, and Kolkata are workshops where time stands still. Master metalworkers hand-shape complex compound curves without computerized stamps, restoring priceless Maharajah cars back to factory perfection.',
          'Preserving these machines is not merely about mechanical engineering; it is an act of safeguarding cultural and industrial heritage.'
        ]
      }
    ]
  },
  {
    id: 'turbocharged-engine-tech',
    category: 'INDIA AUTO',
    title: 'The Engineering Behind Small-Displacement Turbo Engines',
    subtitle: 'How 1.0L and 1.5L turbocharged petrol engines deliver power without sacrificing efficiency.',
    author: 'Ananya Roy',
    authorRole: 'Clean Tech & Mobility Correspondent, Bengaluru',
    date: 'SEP 20, 2026',
    readTime: '6 Min Read',
    readMinutes: 6,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Twin-scroll turbocharger with integrated electronic wastegate actuator',
    excerpt: 'Direct injection, variable valve timing, and twin-scroll turbos in compact Indian hatchbacks, sedans, and crossover SUVs.',
    keywords: ['Turbo', 'Engine', 'Downsizing', 'Efficiency', 'Horsepower', 'Mechanics'],
    keyTakeaways: [
      'Downsizing displacement reduces internal friction losses during low-load city driving.',
      'Low-inertia turbine wheels eliminate old-school turbo lag, delivering peak torque as early as 1,500 RPM.',
      'Direct cylinder fuel injection allows higher compression ratios without causing engine knock.'
    ],
    sections: [
      {
        heading: 'Maximum Output, Minimum Footprint',
        paragraphs: [
          'Stricter emission norms like BS6 Stage 2 forced automotive engineers to reconsider traditional large-displacement naturally aspirated engines. By utilizing high-pressure direct fuel injectors and lightweight turbochargers, small three-cylinder engines now output power figures that once required a hefty 2.0-liter block.'
        ]
      }
    ]
  },
  {
    id: 'motogp-racing-engineering',
    category: 'MOTORSPORT',
    title: 'MotoGP Mechanics: Riding at 350 km/h on Two Wheels',
    subtitle: 'Seamless gearboxes, pneumatic valves, and lean angles exceeding 64 degrees.',
    author: 'Marcus Vance',
    authorRole: 'Chief Technical Correspondent, Silverstone',
    date: 'SEP 15, 2026',
    readTime: '7 Min Read',
    readMinutes: 7,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=80',
    imageCaption: 'Carbon-carbon brake discs glowing at 850°C under heavy braking',
    excerpt: 'Exploring the extreme physics and engineering required to handle 300-horsepower prototype motorcycles around the Buddh International Circuit and beyond.',
    keywords: ['MotoGP', 'Racing', 'Motorcycle', 'Aerodynamics', 'Brakes', 'Speed'],
    keyTakeaways: [
      'MotoGP prototypes produce over 300 horsepower from a 1,000cc four-cylinder engine while weighing just 157 kilograms.',
      'Seamless transmissions allow upshifts and downshifts with zero drive torque interruption.',
      'Front ride-height devices mechanically squat the motorcycle’s suspension to curb wheelies down long straights.'
    ],
    sections: [
      {
        heading: 'Taming the 300-Horsepower Missile',
        paragraphs: [
          'A MotoGP bike is the purest physical contest between raw mechanical violence and rider bravery. Accelerating from 0 to 200 km/h in under five seconds while leaning at angles that drag both knee and elbow on the curbing requires sublime mechanical synchronization.',
          'With the Indian Grand Prix returning to the calendar, fans are witnessing first-hand the astonishing brake forces generated by carbon discs glowing cherry red under deceleration.'
        ]
      }
    ]
  }
];

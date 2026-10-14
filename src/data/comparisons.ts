import { MachineShowdown } from '../types';

export const MACHINE_SHOWDOWNS: MachineShowdown[] = [
  {
    id: 'nexon-ev-vs-xuv400',
    title: 'Electric Crossover Clash',
    subtitle: 'India’s two homegrown electric SUVs fight for everyday commuting and highway supremacy.',
    vehicleA: {
      name: 'Tata Nexon.ev Long Range',
      subtitle: 'The Market Benchmark',
      category: 'Electric Compact SUV',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      powerHp: 143,
      torqueNm: 215,
      zeroToHundredSec: 8.9,
      topSpeedKmh: 150,
      rangeOrMileage: '465 km (MIDC Claimed) / ~320 km Real World',
      curbWeightKg: 1445,
      priceBracket: '₹14.49 - ₹19.49 Lakh',
      powerUnit: '45 kWh LFP Battery + PMSM Motor',
      drivetrain: 'Front-Wheel Drive, Single-Speed Reduction'
    },
    vehicleB: {
      name: 'Mahindra XUV400 EL Pro',
      subtitle: 'The Acceleration Contender',
      category: 'Electric Compact SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      powerHp: 150,
      torqueNm: 310,
      zeroToHundredSec: 8.3,
      topSpeedKmh: 160,
      rangeOrMileage: '456 km (MIDC Claimed) / ~310 km Real World',
      curbWeightKg: 1578,
      priceBracket: '₹15.49 - ₹19.39 Lakh',
      powerUnit: '39.4 kWh NMC High-Energy Battery',
      drivetrain: 'Front-Wheel Drive with 310 Nm Instant Torque'
    },
    editorialVerdict:
      'The Tata Nexon.ev wins on interior plushness, software refinement (arcade games, V2V/V2L charging, and dual 12.3-inch displays), and widespread charging ecosystem integration. However, the Mahindra XUV400 punches back with longer cabin wheelbase and explosive 310 Nm torque that pins passengers into the seats under full throttle.'
  },
  {
    id: 'himalayan-vs-ktm390',
    title: 'High-Altitude Adventure Duel',
    subtitle: 'Classic torque and plush long-travel suspension vs Austrian high-revving rally agility.',
    vehicleA: {
      name: 'Royal Enfield Himalayan 450',
      subtitle: 'The Ladakh Transcontinental',
      category: 'Dual-Sport Adventure Bike',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      powerHp: 40,
      torqueNm: 40,
      zeroToHundredSec: 6.8,
      topSpeedKmh: 152,
      rangeOrMileage: '30 km/L (~510 km on 17L Tank)',
      curbWeightKg: 196,
      priceBracket: '₹2.85 - ₹3.15 Lakh',
      powerUnit: '452cc Liquid-Cooled DOHC "Sherpa 450"',
      drivetrain: '6-Speed with Assist & Slipper Clutch'
    },
    vehicleB: {
      name: 'KTM 390 Adventure SW',
      subtitle: 'The Rally Scalpel',
      category: 'Adventure Enduro Tourer',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      powerHp: 44,
      torqueNm: 37,
      zeroToHundredSec: 5.7,
      topSpeedKmh: 165,
      rangeOrMileage: '28 km/L (~400 km on 14.5L Tank)',
      curbWeightKg: 177,
      priceBracket: '₹3.40 - ₹3.65 Lakh',
      powerUnit: '373cc High-Revving Single, 4-Valve DOHC',
      drivetrain: '6-Speed with Bi-Directional Quickshifter+'
    },
    editorialVerdict:
      'The Himalayan 450 is unmatched for all-day comfort over rough broken trails and high-altitude climbs where low-end tractor torque and supple Showa suspension absorb jagged rock hits. The KTM 390 Adventure SW is for riders craving razor-sharp cornering, lighter weight, and instantaneous quickshifter track thrills on tarmac and graded fire roads.'
  },
  {
    id: 'gt3rs-vs-296gtb',
    title: 'Track Weapon vs Hybrid Howler',
    subtitle: 'The pinnacle of aerodynamic downforce vs Italian plug-in hybrid twin-turbo scream.',
    vehicleA: {
      name: 'Porsche 911 GT3 RS (992)',
      subtitle: 'The Aero Monster',
      category: 'Track-Focused Supercar',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      powerHp: 525,
      torqueNm: 465,
      zeroToHundredSec: 3.2,
      topSpeedKmh: 296,
      rangeOrMileage: '860 kg Downforce at 285 km/h',
      curbWeightKg: 1450,
      priceBracket: '₹3.50+ Crore (Ex-showroom India)',
      powerUnit: '4.0L Naturally Aspirated Boxer-6 (9,000 RPM)',
      drivetrain: '7-Speed PDK Dual-Clutch with Active DRS'
    },
    vehicleB: {
      name: 'Ferrari 296 GTB',
      subtitle: 'The "Piccolo V12"',
      category: 'Hybrid Mid-Engine Berlinetta',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      powerHp: 830,
      torqueNm: 740,
      zeroToHundredSec: 2.9,
      topSpeedKmh: 330,
      rangeOrMileage: '25 km Pure Electric Range Mode',
      curbWeightKg: 1470,
      priceBracket: '₹5.40+ Crore (Ex-showroom India)',
      powerUnit: '3.0L 120° Twin-Turbo V6 + Electric Motor',
      drivetrain: '8-Speed F1 Dual-Clutch Transmission'
    },
    editorialVerdict:
      'The Porsche 911 GT3 RS creates so much mechanical and aerodynamic downforce that it bends physics on race tracks, offering telemetry-grade driver communication. The Ferrari 296 GTB, meanwhile, delivers an intoxicating 830 horsepower crescendo with instant electric boost fill, wrapping supercar performance in timeless Italian sculpture.'
  }
];

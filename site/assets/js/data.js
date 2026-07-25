/* Oasis Star General Trading — catalogue data.
   Sourced from the client's 2025 product catalogue. Four documented lines
   plus the categories listed in their profile that have no product detail yet.

   The ecom Ex-Handy 10 DZ1 was in the 2025 catalogue but is discontinued for
   Oasis Star and has been removed.

   Product shape:
     id, brand, model, name, cat, lede, specs[[label, value]],
     standards[], sizes { label, options[{value,label,code}] } | null,
     photo, photoAlt                                          (both optional)

   Product photography: set `photo` to a path under assets/img/ and `photoAlt`
   to a real description, and the datasheet renders the photo in place of the
   category pictogram. Leave both unset and the pictogram shows instead, so
   lines without licensed imagery still look deliberate. Adding a photo is a
   data edit only — no template changes needed.

     photo:    'assets/img/rw-3228.jpg',
     photoAlt: 'Red Wing Petroking 3228 six-inch boot, side view'
*/

window.OS_CATEGORIES = [
  { id: 'foot',  icon: 'pic-foot', label: 'Foot protection',
    note: 'Safety boots and shoes', stocked: true },
  { id: 'hand',  icon: 'pic-hand', label: 'Hand protection',
    note: 'Impact and cut-resistant gloves', stocked: true },
  { id: 'exdev', icon: 'pic-gas',  label: 'Hazardous-area devices',
    note: 'Zone 1/21 certified devices', stocked: true },
  { id: 'head',  icon: 'pic-head', label: 'Head protection',
    note: 'Safety helmets and accessories', stocked: false },
  { id: 'eye',   icon: 'pic-eye',  label: 'Eye and face protection',
    note: 'Spectacles, goggles and shields', stocked: false },
  { id: 'body',  icon: 'pic-body', label: 'Body protection',
    note: 'Coveralls and reflective vests', stocked: false }
];

function euRange(a, b) {
  var out = [];
  for (var i = a; i <= b; i++) { out.push({ value: String(i), label: 'EU ' + i }); }
  return out;
}

window.OS_PRODUCTS = [
  {
    id: 'rw-3228', brand: 'Red Wing', model: '3228', cat: 'foot',
    name: "Petroking 6-inch boot",
    origin: 'Made in Italy',
    lede: 'A waterproof Nubuck leather boot built for heavy industry, with a non-metallic safety toe and a puncture-resistant Swen-Flex insole. Light enough for a full shift, rated for electrical hazard, heat and chemical exposure.',
    specs: [
      ['Upper', 'Waterproof Nubuck leather'],
      ['Safety toe', 'Non-metallic'],
      ['Insole', 'Swen-Flex, puncture resistant'],
      ['Outsole', 'TredMax, slip and heat resistant'],
      ['Protection', 'ForceGuard chemical and abrasion resistance'],
      ['Electrical', 'EH rated'],
      ['Height', '6 inch'],
      ['Origin', 'Made in Italy']
    ],
    standards: ['EN ISO 20345', 'ASTM F2413', 'EH', 'PR', 'SR'],
    sizes: { label: 'Size', options: euRange(35, 48) }
  },

  {
    id: 'rw-3229', brand: 'Red Wing', model: '3229', cat: 'foot',
    name: "Petroking 8-inch boot",
    origin: 'Made in Italy',
    lede: 'The eight-inch Petroking, for work that needs ankle support as well as protection. Black waterproof Nubuck upper, non-metallic toe, and the ForceGuard system for abrasion, chemical, oil and gas resistance.',
    specs: [
      ['Upper', 'Waterproof black Nubuck leather'],
      ['Safety toe', 'Non-metallic'],
      ['Insole', 'Swen-Flex, puncture resistant'],
      ['Outsole', 'TredMax, slip and heat resistant'],
      ['Protection', 'ForceGuard against abrasion, chemicals, oil and gas'],
      ['Electrical', 'EH rated'],
      ['Height', '8 inch'],
      ['Origin', 'Made in Italy']
    ],
    standards: ['EN ISO 20345', 'ASTM F2413', 'EH', 'PR', 'NT', 'SR'],
    sizes: { label: 'Size', options: euRange(35, 48) }
  },

  {
    id: 'rn-267', brand: 'Roughneck', model: '267 series', cat: 'hand',
    name: 'TefLoc Palm Ringers glove',
    origin: 'Kevlar stitched',
    lede: 'An impact glove with TPR guards across the back of the hand and fingers, and a TefLoc palm that keeps its grip in oil. High-visibility build for engineering, manufacturing, oil and gas, and utilities work.',
    specs: [
      ['Impact', 'TPR protection on back of hand and fingers'],
      ['Cut, CE', 'EN 388 level 2 cut and puncture'],
      ['Cut, ANSI', 'ANSI/ISEA level 2'],
      ['Grip', 'TefLoc palm and finger, oil resistant'],
      ['Wrist', 'Extended Airprene closure'],
      ['Stitching', 'Kevlar stitched palm'],
      ['Visibility', 'High-visibility design'],
      ['Industries', 'Engineering, manufacturing, oil and gas, utilities']
    ],
    standards: ['CE EN 388', 'ANSI/ISEA 105'],
    sizes: {
      label: 'Size',
      options: [
        { value: 'XS',  label: 'XS',  code: '267-07' },
        { value: 'S',   label: 'S',   code: '267-08' },
        { value: 'M',   label: 'M',   code: '267-09' },
        { value: 'L',   label: 'L',   code: '267-10' },
        { value: 'XL',  label: 'XL',  code: '267-11' },
        { value: '2XL', label: '2XL', code: '267-12' },
        { value: '3XL', label: '3XL', code: '267-13' },
        { value: '4XL', label: '4XL', code: '267-14' }
      ]
    }
  },

  {
    id: 'ecom-smartex03', brand: 'ecom instruments', model: 'Smart-Ex 03 DZ1', cat: 'exdev',
    name: 'Smart-Ex 03 DZ1 smartphone',
    origin: 'Zone 1/21 / Div 1',
    lede: 'An explosion-proof Android 13 smartphone for Zone 1/21 and Division 1 areas. Six-inch glove-operable display, 5G, lone worker protection and programmable PTT and alarm buttons.',
    specs: [
      ['Certification', 'Zone 1/21 and Div 1 hazardous areas'],
      ['Operating system', 'Android 13, Android Enterprise Recommended'],
      ['Processor', 'Qualcomm Snapdragon QCM6490, SDR753 platform'],
      ['Display', '6 inch capacitive multi-touch, Gorilla Glass, glove operable'],
      ['Memory', '8 GB RAM, 128 GB storage'],
      ['Camera', 'Optional 13 MP rear with autofocus and LED flash, 5 MP front, 1080p video'],
      ['Connectivity', '5G NR, 4G LTE, 3G, 2G, Wi-Fi, Bluetooth, GPS, NFC'],
      ['Battery', '4400 mAh Li-Ion, USB-C or docking station'],
      ['SIM', 'eSIM plus nano-SIM'],
      ['Worker safety', 'Programmable PTT, alarm and multifunction buttons, lone worker protection'],
      ['Sensors', 'Biometric, accelerometer, gyrometer, magnetometer, barometer, proximity, ambient light'],
      ['Audio', '3.5 mm interface for legacy and current PTT accessories'],
      ['Approvals', 'PTCRB, GCF, Google ARCore ready']
    ],
    standards: ['ATEX Zone 1/21', 'Div 1', 'PTCRB', 'GCF'],
    sizes: null
  }
];

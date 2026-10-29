/* Oasis Star General Trading — catalogue data.
   Sourced from the client's 2025 product catalogue, plus the 6338 (Red Wing
   Dubai product sheet) and R-138 (Ringers product sheet) supplied by the
   client in Oct 2026. Photos are cut from those sheets. Originally four lines
   plus the categories listed in their profile that have no product detail yet.
   The 267 ratings come from the Ringers Impact Protection catalogue (2019),
   which corrects the client catalogue: its "level 2" is ISEA 138 impact, not
   ANSI cut, and EN 388 puncture is 3, not 2. See docs/datasheet-verification.md.

   The ecom Ex-Handy 10 DZ1 was in the 2025 catalogue but is discontinued for
   Oasis Star and has been removed.

   Product shape:
     id, brand, model, name, cat, lede, specs[[label, value]],
     standards[], sizes { label, options[{value,label,code}] } | null,
     photo, photoAlt                                          (both optional)
     datasheet                                                (optional)
     certs[{ standard, body, ref }]                           (optional)

   Documents: set `datasheet` to a PDF under assets/docs/ and the datasheet
   and certificate register link it for download. Leave it unset and both
   offer "Request datasheet and certificates" on WhatsApp instead. Only add
   a manufacturer PDF once the client confirms it may be redistributed.
   `certs` lists certificate details where the manufacturer publishes them,
   e.g. { standard: 'EN ISO 11612', body: 'SATRA (NB 2777)', ref: '2777/12375-02' }.

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

function usRun(width, a, b) {
  var out = [];
  for (var i = a; i <= b; i++) { out.push({ value: width + i, label: 'US ' + i + ' ' + width }); }
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
      ['Origin', 'Made in Italy'],
      ['Best for', 'Oil and gas, refinery and heavy-industry crews facing electrical, puncture and chemical hazards underfoot']
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
      ['Origin', 'Made in Italy'],
      ['Best for', 'The same hazards as the 3228 where the work needs ankle support: rough ground, scaffolds, rig floors']
    ],
    standards: ['EN ISO 20345', 'ASTM F2413', 'EH', 'PR', 'NT', 'SR'],
    sizes: { label: 'Size', options: euRange(35, 48) }
  },

  {
    id: 'rw-6338', brand: 'Red Wing', model: '6338', cat: 'foot',
    name: 'Athletic safety shoe',
    origin: 'Made in Vietnam',
    photo: 'assets/img/rw-6338.jpg',
    photoAlt: 'Red Wing 6338 athletic safety shoe, black nylon upper with orange rubber-EVA outsole, side view',
    lede: 'A light, breathable safety trainer for crews who are on their feet and moving all shift. Nylon upper with mesh lining, aluminium safety toe and electrical hazard protection, on a rubber-EVA outsole rated best for oil, chemical, abrasion and heat resistance.',
    specs: [
      ['Upper', 'Breathable nylon with mesh lining'],
      ['Safety toe', 'Aluminium'],
      ['Outsole', 'Rubber-EVA Stealth, non-marking'],
      ['Resistance', 'Oil and gas, chemical, abrasion and heat: rated best'],
      ['Electrical', 'EH rated'],
      ['Construction', 'Cement; non-woven insole, nylon shank, last 305'],
      ['Origin', 'Made in Vietnam'],
      ['Best for', 'Logistics, shipyard, maintenance and plant crews who find full boots too heavy and hot']
    ],
    standards: ['ASTM F2413-24', 'I/C', 'EH', 'SR'],
    sizes: { label: 'Size and width', options: usRun('D', 7, 15).concat(usRun('E', 7, 15), usRun('H', 8, 13)) }
  },

  {
    id: 'rn-267', brand: 'Roughneck', model: '267 series', cat: 'hand',
    name: 'TefLoc Palm Ringers glove',
    origin: 'Kevlar stitched',
    lede: 'An impact glove with TPR guards across the back of the hand and fingers, and a TefLoc palm that keeps its grip in oil. High-visibility build for engineering, manufacturing, oil and gas, and utilities work.',
    specs: [
      ['Impact', 'TPR protection on back of hand and fingers'],
      ['Impact rating', 'ANSI/ISEA 138 level 2'],
      ['EN 388', '4243BP: abrasion 4, cut 2, tear 4, puncture 3, ISO cut B, impact pass'],
      ['Grip', 'TefLoc palm and finger, oil resistant'],
      ['Liner', 'Knit Kevlar'],
      ['Wrist', 'Extended Airprene closure with TPR pull tab'],
      ['Stitching', 'Kevlar stitched palm'],
      ['Visibility', 'High-visibility design'],
      ['Packaging', '5 pairs per bag, 50 pairs per carton'],
      ['Industries', 'Engineering, manufacturing, oil and gas, utilities'],
      ['Best for', 'Rig floors, rigging and pipe handling, where impact and pinch points cause most hand injuries']
    ],
    standards: ['EN 388 4243BP', 'ANSI/ISEA 138 L2', 'EN 420'],
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
    id: 'rn-138', brand: 'Ringers', model: 'R-138', cat: 'hand',
    name: 'Hi-vis touchscreen work glove',
    origin: 'EN ISO 21420 Cat. II',
    photo: 'assets/img/rn-138.jpg',
    photoAlt: 'Ringers R-138 glove, fluorescent yellow mesh back with black synthetic leather palm and reflective trim',
    lede: 'A light, high-visibility glove for workshop, vehicle and light handling work, where dexterity matters more than impact protection. Synthetic split-leather palm for grip and wear, touchscreen fingertips so phones and tablets work without taking it off.',
    specs: [
      ['Back of hand', 'Soft, lightweight high-visibility mesh with reflective markings'],
      ['Palm', 'Synthetic split leather for grip and durability'],
      ['Index finger', 'Wear and tear resistant wraparound'],
      ['Closure', 'Hook and loop with TPR pull tab'],
      ['Touchscreen', 'Thumb, index and middle fingertips'],
      ['EN 388', '2121X'],
      ['ANSI/ISEA 105', 'Abrasion 3, cut A1, puncture 2'],
      ['Best for', 'Automotive workshops, fleet maintenance, logistics and light assembly']
    ],
    standards: ['EN 388 2121X', 'EN ISO 21420', 'CE Cat. II'],
    sizes: null
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
      ['Approvals', 'PTCRB, GCF, Google ARCore ready'],
      ['Best for', 'Crews in Zone 1/21 areas who cannot carry an ordinary phone, and lone workers who need an alarm button']
    ],
    standards: ['ATEX Zone 1/21', 'Div 1', 'PTCRB', 'GCF'],
    sizes: null
  }
];

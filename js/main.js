import {adDisabled, DISABLED_ELEMENTS} from './inactive-state.js';
import  {renderMapInActiveState} from './active-state.js';
// import  {createTemplateElement} from './template-ad-element.js';
// // import {SIMILAR_ADS_COUNT, createAd} from './ad-object.js';
// import {mainPinMarker, pinAllMarks, getMarkerAdres} from './markers.js';

adDisabled(DISABLED_ELEMENTS);
renderMapInActiveState();

// const getAddsArr = (onSuccess) => {
//   fetch('https://22.javascript.pages.academy/keksobooking/data')
//     .then((response) => response.json())
//     .then((ads) => {
//       onSuccess(ads);
//     });
// };

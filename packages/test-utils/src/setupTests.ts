import '@testing-library/jest-dom/extend-expect';
import { setup } from 'twind';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

setup();

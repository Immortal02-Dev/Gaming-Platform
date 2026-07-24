import type flatpickr from 'flatpickr'; 
declare global { 
  interface Window { 
    myFlatpickr?: typeof flatpickr; 
  } 
}

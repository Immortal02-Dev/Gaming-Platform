"use client";

import { useState } from "react";

interface Option {
  value: string;
  label: string;
  icon?: string; // Optional image URL
}

interface ReusableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean; // Galing sa parent
  onToggle: () => void; // Function para i-toggle ang state sa parent
  showSearch?: boolean; // Kung gusto mong may search bar
  placeholder?: string; // Placeholder para sa search
}

const ReusableSelect = ({
  options,
  value,
  onChange,
  isOpen,
  onToggle,
  showSearch = false,
  placeholder = "Search...",
}: ReusableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    onToggle(); // Isasara ang dropdown pagkatapos pumili
    setSearchTerm("");
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* TRIGGER BUTTON */}
      <button
        className="button button-m select bg-input_bright text-base w-full"
        type="button"
        onClick={onToggle}
      >
        <div className="flex items-center ellipsis flex-auto text-left">
          {/* Ipakita ang icon sa main button kung meron */}
          {selectedOption?.icon && (
            <img src={selectedOption.icon} className="mr-2 size-5!" alt="" />
          )}
          {selectedOption?.label || "Select..."}
        </div>
        <div className="size-6 ml-auto bg-input_button center rounded-md">
          <div
            className={`icon size-4! transition-all ${isOpen ? "rotate-90" : "-rotate-90"}`}
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
            </svg>
          </div>
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="scroll-y dropdown-layer bg-layer3 select-options absolute w-full z-50 top-12 left-1">
          <div className="scroll-container">
            <div>
              {/* CONDITIONALLY RENDER SEARCH BAR */}
              {showSearch && (
                <div className="w-full sticky -top-2 z-30 -mt-2 bg-layer0 py-3">
                  <div className="input flex items-center bg-layer0 rounded p-1">
                    <div className="icon w-6! h-6! mr-1 text-tertiary">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <input
                      className="bg-transparent border-none outline-none text-sm w-full"
                      placeholder={placeholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = value === option.value;
                  return (
                    <button
                      key={option.value}
                      className={`radio cursor-pointer btn-like select-item w-full flex items-center h-10 hover:bg-[#f3f3f3] ${
                        isSelected ? "darkness-5 text-black" : ""
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {/* CONDITIONALLY RENDER IMAGE */}
                      {option.icon && (
                        <img
                          className="mr-2 size-6!"
                          src={option.icon}
                          alt={option.label}
                        />
                      )}

                      <div className="ellipsis w-0 flex-auto text-left">
                        {option.label}
                      </div>

                      <label className="radio-container pointer-events-none">
                        <input type="radio" readOnly checked={isSelected} />
                        <span className="checkmark"></span>
                      </label>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No results found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableSelect;

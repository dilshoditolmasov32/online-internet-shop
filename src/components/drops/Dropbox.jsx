import React, { useState } from 'react';

const Dropbox = ({ array, selected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(array[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelectedOption(option);
        selected()
        setIsOpen(false);
        selected(option)
    };
 
    return (
        <div className="dropbox">

            <div onClick={() => { toggleDropdown() }} className="dropbox-button">
                {selectedOption}
            </div>

            {isOpen ? (

                <div className="dropbox-list">
                    {array.map((e, i) => (
                        <div key={i} onClick={() => { handleSelect(e) }} className="dropbox-list__element">
                            {e}
                        </div>
                    ))}
                </div>
            ) : (
                ''
            )}

        </div>
    );
};

export default Dropbox;

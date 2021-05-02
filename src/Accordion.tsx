import React from 'react';
import { Rating } from './Rating';
import AccordionTitle from './AccordionTitle';
import AccordionBody from './AccordionBody';

type AccordionPropsType = {
    titleValue: string
}

function Accordion(props: AccordionPropsType) {
    debugger

    console.log("Accordion rendering")
    return <div>
        <Rating value={3} />
        <AccordionTitle title={props.titleValue} />
        < AccordionBody />
    </div>
}

export default Accordion;
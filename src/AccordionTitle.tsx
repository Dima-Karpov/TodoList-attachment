import React from 'react';

type AccordionTitlePopsType = {
    title: string
}

function AccordionTitle(props: AccordionTitlePopsType) {
    debugger
    console.log("AccordionTitl rendering")
    return <div>
        <h3>--- {props.title} ---</h3>
    </div>
}

export default AccordionTitle;